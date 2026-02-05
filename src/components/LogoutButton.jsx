import React, { useState } from "react";
import usePushService from "../services/pushService.js";
import { useAuth } from "../context/AuthContext";

const LogoutButton = ({ label = 'Cerrar sesión', loadingLabel = 'Cerrando sesión...', className = '' }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { logout } = useAuth();
  const { unsubscribeToPush } = usePushService();
  
  const handleLogout = async () => {
    if (loading) return;
    try {
      setError(null);
      setLoading(true);
      await unsubscribeToPush();
      await logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    } catch (err) {
      alert(`Error cerrando sesión: ${err}`);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleLogout} disabled={loading} className={className}>
      {loading? loadingLabel : label}
    </button>
  )
}

export default LogoutButton;