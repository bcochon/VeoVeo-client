import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <div className="left-header">
        <a href="/" aria-label="Home"><FontAwesomeIcon icon={faHouse}/></a>
      </div>
      <div className="right-header">
        <a href="/login" aria-label="Mi perfil"><FontAwesomeIcon icon={faUserCircle}/></a>
      </div>
    </header>
  )
}

export default Header;