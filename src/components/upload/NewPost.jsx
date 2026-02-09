import React, { useState } from "react";
import LoadingSpinner from "../utils/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";
import useUploadService from "../../services/uploadService";

const NewPost = ({ image = null, color = null, onUploading = () => {}, onCancel = () => {} }) => {
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { dataURLtoBlob, createPost } = useUploadService();


  async function upload() {
    try {
      setLoading(true);
      onUploading(true);
      const blob = dataURLtoBlob(image);
      const newPost = await createPost(blob, color, description);
      navigate(`/posts/${newPost?.id}`);
    } catch(err) {
      console.error('Error subiendo imagen:', err);
    } finally {
      setLoading(false);
      onUploading(false);
    }
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
      <textarea
        className="description-input"
        type="text" 
        placeholder="Descripción de la imagen..." 
        name="Descripcion"
        maxLength={128}
        onChange={(e) => setDescription(e?.target?.value)}
      />
      <div className="new-post-actions">
        <button type="button" onClick={onCancel} disabled={loading}>
          Volver
        </button>
        <button type="button" onClick={upload} disabled={loading}>
          {loading ? "Subiendo..." : "Subir"}
        </button>
      </div>
    </div>
  );
}

export default NewPost;