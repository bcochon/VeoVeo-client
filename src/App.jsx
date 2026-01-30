import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import Home from './pages/Home';
import Login from "./pages/Login";
import './App.css'
import 'leaflet/dist/leaflet.css';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return children;
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          }
        /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
