import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faFlag, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import "./PostOptions.css";
import LoadingSpinner from "../utils/LoadingSpinner";

function PostOptionsModal({ post, onDelete }) {
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { profile } = useProfile();

  const toggleReportModal = (e, reason = undefined) => {
    e.preventDefault();
    setReportReason(reason);
    setReportOpen(!reportOpen);
  };

  const openDeleteModal = (e) => {
    e.preventDefault();
    onDelete();
  }

  if (loading) return (
    <LoadingSpinner label=""/>
  );

  if (!profile) return <p>...</p>;

  if (profile?.id === post?.user?.id)
    return (
      <>
        <button
          type="button"
          className="post-options-button post-options-danger-button"
          onClick={openDeleteModal}
        >
          <FontAwesomeIcon icon={faTrash} />
          <span>Eliminar foto</span>
        </button>
      </>
    );

  if (reportOpen) return (
    <form action="">
      <h4>¿Hay algo malo con este post?</h4>
      <div className="post-report-actions">
        <button
          type="button"
          className="close-report"
          onClick={toggleReportModal}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="submit-report"
        >
          Enviar
        </button>
      </div>
    </form>
  );

  return (
    <>
      <button
        type="button"
        className="post-options-button"
        onClick={(e) => toggleReportModal(e, "color")}
      >
        <FontAwesomeIcon icon={faCircleQuestion} />
        <span>¿No respeta el color?</span>
      </button>
      <button
        type="button"
        className="post-options-button post-options-danger-button"
        onClick={toggleReportModal}
      >
        <FontAwesomeIcon icon={faFlag} />
        <span>Reportar publicación</span>
      </button>
    </>
  );
}

function PostOptions({ isOpen, onClose, post, onDelete }) {
  const { user } = useAuth();
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!closing) return;

    const timeoutId = setTimeout(() => {
      setClosing(false);
      onClose();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [closing, onClose]);

  const closeOptions = (e) => {
    e.preventDefault();
    setClosing(true);
  };

  if (!isOpen || !user) return <span className="post-options-container" />;

  return (
    <div className={"post-options-container" + (closing ? " closing" : "")}>
      <div className="post-options-overlay">
        <button
          type="button"
          className="post-options-close"
          onClick={closeOptions}
          aria-label="Cerrar opciones"
          disabled={closing}
        />
        <div className="post-options-modal">
          <PostOptionsModal post={post} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
}

export default PostOptions;