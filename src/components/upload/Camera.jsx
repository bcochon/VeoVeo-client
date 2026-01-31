import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./Camera.css";

const Camera = ({ onCapture = () => {} }) => {
  const [accesDenied, setAccessDenied] = useState(true);

  const webcamRef = useRef(null);

  useEffect(() => {
    const ref = webcamRef.current;
    return () => {
      const stream = ref?.stream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    onCapture(imageSrc);
  };

  return (
    <div className="camera-container">
      <div className="video-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "user",
          }}
          onUserMediaError={(err) => {
            console.error("Camera error:", err);
            setAccessDenied(true);
          }}
          onUserMedia={() => {
            console.log("Camera ready");
            setAccessDenied(false);
          }}
          className="camera"
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
        {!accesDenied && (
          <button
            className="capture-button"
            onClick={capture}
            aria-label="Capturar foto"
          />
        )}
      </footer>
    </div>
  );
}

export default Camera;