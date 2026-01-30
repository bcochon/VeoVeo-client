import React, { useState } from "react";
import { logout } from "../services/authService.js";
import { useAuth } from "../context/AuthContext";
import { unsubscribeToPush } from "../services/pushService.js";

const LogoutButton = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleLogout = async () => {
    if (loading) return;
    try {
      setError(null);
      setLoading(true);
      await unsubscribeToPush();
      await logout();
      setUser(null);
    } catch (err) {
      alert(`Error cerrando sesión: ${err}`);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading? 'Cerrar sesión' : 'Cerrando sesión...'}
    </button>
  )
}

export default LogoutButton;