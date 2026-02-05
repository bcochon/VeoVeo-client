import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import Home from './pages/Home';
import News from "./pages/News";
import Upload from "./pages/Upload";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import './App.css'
import 'leaflet/dist/leaflet.css';
import PostView from "./pages/PostView";
import UserPage from "./pages/UserPage";

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
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route
          path="/camera"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route path="/explore" element={<Explore />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/users/:userId" element={<UserPage />} />
        <Route path="/posts/:postId" element={<PostView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
