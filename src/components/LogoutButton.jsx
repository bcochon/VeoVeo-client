import React from "react";
import { logout } from "../services/authService.js";
import { useAuth } from "../context/AuthContext";
import { unsubscribeToPush } from "../services/pushService.js";

const LogoutButton = () => {
  const { setUser } = useAuth();
  
  const handleLogout = async () => {
    try {
      await unsubscribeToPush();
      await logout();
      setUser(null);
    } catch (err) {
      alert(`Error cerrando sesión: ${err}`);
    }
  }

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  )
}

export default LogoutButton;