import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import LoginForm from "../components/LoginForm.jsx";
import LogoutButton from "../components/LogoutButton.jsx";
import Footer from "../components/Footer.jsx";
import "./Login.css";

const Login = () => {
  const { user } = useAuth();

  return (
    <main>
      <div className="flex-container">
        <h4>
          {user ? `Logueado como ${user?.username}` : "Sesión no iniciada"}
        </h4>
        {user ? (
          <>
            <LogoutButton />
            {/* <AllowNotifications /> */}
            <Link to="/">Ir a inicio</Link>
          </>
        ) : (
          <LoginForm />
        )}
      </div>
      <Footer currentPage={"profile"}/>
    </main>
  );
};

export default Login;
