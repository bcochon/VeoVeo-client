import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Camera from "../components/upload/Camera";
import NewPost from "../components/upload/NewPost";
import { useColor } from "../context/ColorContext";
import { useNavigate } from "react-router-dom";
import './Upload.css';

const Upload = () => {
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { colorDay } = useColor();
  const navigate = useNavigate();

  const handleBack = () => {
    if(uploading) return;
    if(photo) {
      navigate("/camera");
      setPhoto(null);
    };
    navigate("/");
  }

  return (
    <main className="upload-container">
      <header className="upload-header fixed-top">
        {!uploading && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Volver"
            className="back-button"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
      </header>

      {!photo ? (
        <Camera onCapture={setPhoto} />
      ) : (
        <NewPost image={photo} color={colorDay} onUploading={setUploading} />
      )}
    </main>
  );
};

export default Upload;