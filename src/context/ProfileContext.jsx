import { createContext, useEffect, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useAuthService } from '../services/authService';

const ProfileContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const { isAuthenticated, loading } = useAuth();
  const { getProfile } = useAuthService();

  useEffect(() => {
    if (loading) return;
    const load = async () => {
      try {
        setProfileLoading(true);
        if (!isAuthenticated)
          setProfile(null);
        else {
          const profileData = await getProfile();
          setProfile(profileData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setProfileLoading(false);
      }
    }
    load();
  }, [ isAuthenticated, loading ])

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, profileLoading }}
    >
      {children}
    </ProfileContext.Provider>
  );
}