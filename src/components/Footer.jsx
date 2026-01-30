import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserCircle, faCamera, faNewspaper, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./Footer.css";

const Footer = ({ currentPage = undefined }) => {
  return (
    <footer className="main-footer">
      <a
        href="/"
        aria-label="Inicio"
        className={
          "footer-button" + (currentPage === "home" ? " selected" : " disabled")
        }
      >
        <FontAwesomeIcon icon={faHouse} />
      </a>

      <a
        href="/news"
        aria-label="Anuncios"
        className={
          "footer-button" + (currentPage === "news" ? " selected" : " disabled")
        }
      >
        <FontAwesomeIcon icon={faNewspaper} />
      </a>

      <a
        href="/camera"
        aria-label="Subir post"
        className="footer-button footer-main-button"
      >
        <FontAwesomeIcon icon={faCamera} />
      </a>

      <a
        href="/explore"
        aria-label="Explorar"
        className={
          "footer-button" + (currentPage === "explore" ? " selected" : " disabled")
        }
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </a>

      <a
        href="/profile"
        aria-label="Mi perfil"
        className={
          "footer-button" + (currentPage === "profile" ? " selected" : " disabled")
        }
      >
        <FontAwesomeIcon icon={faUserCircle} />
      </a>
    </footer>
  );
}

export default Footer;