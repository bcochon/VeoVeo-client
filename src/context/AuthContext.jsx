import { createContext, useEffect, useState, useContext } from 'react';
import { getProfile } from '../services/authService';
import FirebaseClient from '../services/firebaseCtrl';

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}