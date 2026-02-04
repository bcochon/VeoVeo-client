import { useState } from 'react';
import useAuthService from '../services/authService';
import usePushService from '../services/pushService';
import { useAuth } from '../context/AuthContext';
import './LoginForm.css';

export default function LoginForm() {
  const { setUser } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login, getProfile } = useAuthService();
  const { subscribeToPush } = usePushService();

  async function handleSubmit(e) {
    e.preventDefault(); // ⛔ stop page reload
    setError(null);
    setLoading(true);

    try {
      await login(username, password);
      const profile = await getProfile();
      setUser(profile);
      await subscribeToPush();
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuario"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Accediendo...' : 'Acceder'}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}
