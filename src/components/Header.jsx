import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from "./Logo";
import "./Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <a href="/" aria-label="Ajustes" className="header-button side-button">
        <FontAwesomeIcon icon={faBars} />
      </a>
      <a href="/" aria-label="Inicio" className="header-button main-logo">
        <Logo />
      </a>
      <a href="/" aria-label="Notificaciones" className="header-button side-button">
        <FontAwesomeIcon icon={faBell} />
      </a>
    </header>
  );
}

export default Header;