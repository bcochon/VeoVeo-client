import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserCircle, faCamera, faNewspaper, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import "./Footer.css";
import { useProfile } from "../context/ProfileContext";

const Footer = ({ currentPage = undefined }) => {
  const { profile } = useProfile();

  return (
    <>
      <span className="empty-footer-placeholder" />
      <footer className="main-footer">
        <Link
          to="/"
          aria-label="Inicio"
          className={
            "footer-button" +
            (currentPage === "home" ? " selected" : " disabled")
          }
        >
          <FontAwesomeIcon icon={faHouse} />
        </Link>

        <Link
          to="/news"
          aria-label="Anuncios"
          className={
            "footer-button" +
            (currentPage === "news" ? " selected" : " disabled")
          }
        >
          <FontAwesomeIcon icon={faNewspaper} />
        </Link>

        <Link
          to="/camera"
          aria-label="Subir post"
          className="footer-button footer-main-button"
        >
          <FontAwesomeIcon icon={faCamera} />
        </Link>

        <Link
          to="/explore"
          aria-label="Explorar"
          className={
            "footer-button" +
            (currentPage === "explore" ? " selected" : " disabled")
          }
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link>

        <Link
          to="/profile"
          aria-label="Mi perfil"
          className={
            "footer-button" +
            (currentPage === "profile" ? " selected" : " disabled")
          }
        >
          {profile ? (
            <img
              src={profile?.profilePicture?.url || "./icon-placeholder.png"}
              alt="Foto del usuario"
              className="user-picture"
            />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} />
          )}
        </Link>
      </footer>
    </>
  );
}

export default Footer;