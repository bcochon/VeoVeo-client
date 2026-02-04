import React, { useState } from "react";
import useAuthService from "../services/authService.js";
import usePushService from "../services/pushService.js";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { logout } = useAuthService();
  const { unsubscribeToPush } = usePushService();
  
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
      {loading? 'Cerrando sesión...' : 'Cerrar sesión'}
    </button>
  )
}

export default LogoutButton;