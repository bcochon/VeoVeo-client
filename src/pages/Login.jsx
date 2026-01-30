import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Header from "../components/Header.jsx";
import LoginForm from "../components/LoginForm.jsx";
import LogoutButton from "../components/LogoutButton.jsx";
import AllowNotifications from "../components/AllowNotifications.jsx";
import "./Login.css";

const Login = () => {
  const { user } = useAuth();

  return (
    <main>
      <div className="flex-container">
        <h4>
          {user ? `Logueado como ${user?.username}` : "Sesión no iniciada"}
        </h4>
        {user ? (
          <>
            <LogoutButton />
            {/* <AllowNotifications /> */}
            <a href="/">Ir a inicio</a>
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </main>
  );
};

export default Login;
