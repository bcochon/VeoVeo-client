import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Camera from "../components/upload/Camera";
import NewPost from "../components/upload/NewPost";
import './Upload.css';

const Upload = () => {
  const [photo, setPhoto] = useState(null);
  return (
    <main className="upload-container">
      <header className="upload-header fixed-top">
        <a href={photo? "/camera" : "/"} aria-label="Volver" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </a>
      </header>
      {!photo ? <Camera onCapture={setPhoto}/> : <NewPost image={photo}/>}
    </main>
  );
};

export default Upload;