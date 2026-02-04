import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Logo from "./Logo";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div id="feedTop" className="empty-header-placeholder fixed-top">
        <span></span>
      </div>
      <header className="main-header">
        <Link to="/login" aria-label="Ajustes" className="header-button side-button">
          <FontAwesomeIcon icon={faBars} />
        </Link>
        <Link
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