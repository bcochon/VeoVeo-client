import React, { useState } from "react";
import "./LoginForm.css";
import { useAuth } from "../context/AuthContext";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";
import { useProfile } from "../context/ProfileContext";
import LogoutButton from "./LogoutButton";
import { useAuthService } from "../services/authService";

export default function LoginForm() {
  const [username, setUsername] = useState(undefined);
  const [formLoading, setLoading] = useState(false);

  const { loginWithRedirect, loading, isAuthenticated, user } = useAuth();
  const { profile, setProfile, profileLoading } = useProfile();
  const { signUp } = useAuthService();

  const login = async () => {  
    setLoading(true);
    if (Capacitor.isNativePlatform())
      Browser.addListener("browserFinished", () => {
        console.log("Login finished");
        setLoading(false);
      });
    await loginWithRedirect();
  };

  const crearCuenta = async () => {
    try {
      setLoading(true);
      const newUser = await signUp(username, user?.email);
      setProfile(newUser);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading || profileLoading) return null;

  if (!isAuthenticated) return (
    <div className="login-container">
      <button disabled={formLoading} onClick={login}>
        {(formLoading || loading) ? "Cargando..." : "Acceder"}
      </button>
    </div>
  );

  if (!profile) return (
    <form className="signup-container">
      <h2>Terminá de crear tu cuenta</h2>
      <div className="username-input">
        <label htmlFor="usernameInput">Nombre de usuario:</label>
        <input
          id="usernameInput"
          name="username"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e?.target?.value)}
          minLength={1}
          maxLength={16}
          placeholder={user?.nickname}
          pattern="^\S+$"
        />
      </div>

      <div className="signup-actions">
        {!formLoading && (
          <LogoutButton label="Descartar" loadingLabel="Cargando..." />
        )}
        <button type="submit" disabled={formLoading} onClick={crearCuenta}>
          Crear cuenta
        </button>
      </div>
    </form>
  );
}
