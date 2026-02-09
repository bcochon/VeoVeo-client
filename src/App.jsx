import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navigate } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import Home from './pages/Home';
import News from "./pages/News";
import Upload from "./pages/Upload";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import './App.css'
import 'leaflet/dist/leaflet.css';
import PostView from "./pages/PostView";
import UserPage from "./pages/UserPage";
import { useProfile } from "./context/ProfileContext";
import ColorExplore from "./pages/ColorExplore";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const { profile, profileLoading } = useProfile();

  if (loading || profileLoading) return null;
  if (!user || !profile) return <Navigate to="/login" />;

  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  const { profile, profileLoading } = useProfile();

  if (loading || profileLoading) return null;
  if (user && !profile) return <Navigate to="/login" />;

  return children;
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/news"
          element={
            <PublicRoute>
              <News />
            </PublicRoute>
          }
        />
        <Route
          path="/camera"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/colors/:colorId"
          element={
            <ProtectedRoute>
              <ColorExplore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <ProfileEdit />
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
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users/:userId"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <PublicRoute>
              <PostView />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
