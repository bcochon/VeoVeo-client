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
    } else {
      navigate("/");
    }
  }

  return (
    <main className="upload-container">
      <header className="upload-header fixed-top">
        {!uploading && (
          <>
            <button
              type="button"
              onClick={handleBack}
              aria-label="Volver"
              className="back-button"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="today-color-container">
              <h2>El color de hoy es</h2>
              <span
                className="today-color"
                style={
                  colorDay?.color?.name === "negro"
                    ? { textShadow: `1px 1px 2px white, -1px -1px 10px white` }
                    : {}
                }
              >
                {colorDay?.color?.name?.toUpperCase()}
              </span>
            </div>
          </>
        )}
      </header>

      {!photo ? (
        <Camera onCapture={setPhoto} />
      ) : (
        <NewPost
          image={photo}
          color={colorDay}
          onUploading={setUploading}
          onCancel={handleBack}
        />
      )}
    </main>
  );
};

export default Upload;