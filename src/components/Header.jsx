import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useColor } from "../context/ColorContext";
import "./Header.css";

const Header = () => {
  const { primaryColor } = useColor();

  return (
    <>
      <div id="feedTop" className="empty-header-placeholder fixed-top">
        <span />
      </div>
      <header className="main-header">
        <Link
          to="/login"
          aria-label="Ajustes"
          className="header-button side-button"
        >
          <FontAwesomeIcon icon={faBars} />
        </Link>
        <Link
          style={
            primaryColor?.name === "negro"
              ? {
                  background: `radial-gradient(circle, rgb(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.25) 30%, rgba(0, 0, 0, 0) 75%)`,
                }
              : {}
          }
          to="/#feedTop"
          aria-label="Inicio"
          className="header-button main-logo"
        >
          <Logo />
        </Link>
        <Link
          to="/"
          aria-label="Notificaciones"
          className="header-button side-button"
        >
          <FontAwesomeIcon icon={faBell} />
        </Link>
      </header>
    </>
  );
}

export default Header;