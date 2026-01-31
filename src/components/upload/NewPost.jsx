import React, { useState } from "react";
import { dataURLtoBlob, createPost } from "../../services/uploadService";
import LoadingSpinner from "../utils/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";

const NewPost = ({ image = null, color = null, onUploading = () => {} }) => {
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function upload() {
    try {
      setLoading(true);
      onUploading(true);
      const blob = dataURLtoBlob(image);
      const newPost = await createPost(blob, color, description);
      navigate("/profile");
    } catch(err) {
      console.error('Error subiendo imagen:', err);
    } finally {
      setLoading(false);
      onUploading(false);
    }
  }

  const handleCancelar = () => {
    setLoading(true);
    navigate("/");
  }

  if (loading) return (
    <div className="new-post-container">
      <LoadingSpinner label=""/>
    </div>
  );

  return (
    <div className="new-post-container">
      {image && (
        <img src={image} alt="Foto de nuevo post" className="preview-image" />
      )}
      <div className="new-post-actions">
        {/* <button type="button" onClick={handleCancelar} disabled={loading}>
          Volver
        </button> */}
        <button type="button" onClick={upload} disabled={loading}>
          {loading ? "Subiendo..." : "Subir"}
        </button>
      </div>
    </div>
  );
}

export default NewPost;