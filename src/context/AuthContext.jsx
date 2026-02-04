import { createContext, useEffect, useState, useContext } from 'react';
import FirebaseClient from '../services/firebaseCtrl';
import useAuthService from '../services/authService';

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginModal, setLoginModal] = useState({ isOpen: false });

  const { getProfile } = useAuthService();

  useEffect(() => {
    getProfile()
      .then((data) => {
        setUser(data)
        FirebaseClient.initApp().catch((err) => console.error('Error iniciando Firebase:', err));
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, []);

  useEffect(() => {
    if(user)
      FirebaseClient.initApp().catch((err) => console.error('Error iniciando Firebase:', err));
  }, [user]);

  const openLoginModal = () => {
    setLoginModal({
      isOpen: true,
      onClose: () => {setLoginModal({ isOpen: false })},
      title: 'Iniciá sesión',
      message: '¡Creá tu cuenta o accedé para poder publicar fotos, seguir usuarios y mucho más!',
      cancelText: "Descartar",
      variant: "info",
      confirmText: "Acceder"
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, loginModal, openLoginModal }}
    >
      {children}
    </AuthContext.Provider>
  );
}