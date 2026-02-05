import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import LoadingSpinner from "../utils/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Camera.css";
import useUploadService from "../../services/uploadService";
import { faImages, faRepeat } from "@fortawesome/free-solid-svg-icons";

const Camera = ({ onCapture = () => {} }) => {
  const [accesDenied, setAccessDenied] = useState(true);
  const [loading, setLoading] = useState(false);
  const [frontCamera, setFrontCamera] = useState(false);

  const hiddenFileInput = useRef(null);
  const webcamRef = useRef(null);

  const { compressImage } = useUploadService();

  useEffect(() => {
    const ref = webcamRef.current;
    return () => {
      const stream = ref?.stream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const switchCamera = () => setFrontCamera(!frontCamera);

  const compressAndProceed = async (image) => {
    // console.log("IMAGEN SIN COMPRIMIR:", image)
    const compressed = await compressImage(image, {
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 0.75,
    });
    console.log("IMAGEN COMPRIMIDA:", compressed);
    onCapture(compressed);
  };

  const handleImageSelect = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          const base64String = reader.result;
          await compressAndProceed(base64String);
        };
        await reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const capture = async () => {
    try {
      setLoading(true);
      const imageSrc = webcamRef.current.getScreenshot();
      await compressAndProceed(imageSrc);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="camera-container">
      <LoadingSpinner label=""/>
    </div>
  );

  return (
    <div className="camera-container">
      <div className="video-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: frontCamera ? "user" : "environment",
          }}
          onUserMediaError={(err) => {
            console.error("Camera error:", err);
            setAccessDenied(true);
          }}
          onUserMedia={() => {
            console.log("Camera ready");
            setAccessDenied(false);
          }}
          className={"camera" + (accesDenied ? " hidden" : "")}
        />
        {accesDenied && (
          <div className="camera-placeholder">
            <p>
              No pudo cargarse la cámara. <br /> Asegurate de haber habilitado
              los permisos
            </p>
          </div>
        )}
      </div>
      <footer className="camera-actions fixed-bottom">
        <button
          className="gallery-button action-button"
          aria-label="Abrir galería"
          onClick={() => hiddenFileInput?.current.click()}
        >
          <input
            type="file"
            accept="image/*"
            name="selectImage"
            ref={hiddenFileInput}
            onChange={handleImageSelect}
          />
          <FontAwesomeIcon icon={faImages} />
        </button>
        {!accesDenied && (
          <button
            className="capture-button action-button"
            onClick={capture}
            aria-label="Capturar foto"
          />
        )}
        <button
          className="switch-camera-button action-button"
          onClick={switchCamera}
          aria-label="Cambiar cámara"
        >
          <FontAwesomeIcon icon={faRepeat} />
        </button>
      </footer>
    </div>
  );
}

export default Camera;