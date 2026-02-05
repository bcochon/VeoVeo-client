import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import LoginForm from "../components/LoginForm.jsx";
import LogoutButton from "../components/LogoutButton.jsx";
import Footer from "../components/Footer.jsx";
import "./Login.css";
import { useProfile } from "../context/ProfileContext.jsx";

const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  const { profile, profileLoading } = useProfile();

  if (loading || profileLoading) return null;

  if (!isAuthenticated || !profile) return (
    <main className="login-page">
      <LoginForm />
      <Footer currentPage={"profile"} />
    </main>
  );

  return (
    <main>
      <div className="flex-container">
        <h4>
          {`Logueado como ${profile?.username}`}
        </h4>
        <LogoutButton />
        {/* <AllowNotifications /> */}
        <Link to="/">Ir a inicio</Link>
      </div>
      <Footer currentPage={"profile"} />
    </main>
  );
};

export default Login;
