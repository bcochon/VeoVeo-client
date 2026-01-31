import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from "./Logo";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div id="feedTop" className="empty-header-placeholder fixed-top">
        <span></span>
      </div>
      <header className="main-header">
        <a href="/login" aria-label="Ajustes" className="header-button side-button">
          <FontAwesomeIcon icon={faBars} />
        </a>
        <a
          href="/#feedTop"
          aria-label="Inicio"
          className="header-button main-logo"
        >
          <Logo />
        </a>
        <a
          href="/"
          aria-label="Notificaciones"
          className="header-button side-button"
        >
          <FontAwesomeIcon icon={faBell} />
        </a>
      </header>
    </>
  );
}

export default Header;