import React, { useRef, useState, useEffect } from "react";
import { compressImage } from "../../services/uploadService";
import LoadingSpinner from "../utils/LoadingSpinner";
import "./NewPost.css";

const NewPost = ({ image = null }) => {
  const [description, setDescription] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [loading, setLoading] = useState(false);

  async function upload() {
    try {
      setLoading(true);
      const compressed = await compressImage(image, {
        maxWidth: 1200,
        maxHeight: 1200,
        quality: 0.9,
      });
      setCompressed(compressed);
    } catch(err) {
      console.error('Error comprimiendo y subiendo imagen:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="new-post-container">
      
    </div>
  );

  return (
    <div className="new-post-container">
      {image && (
        <img src={image} alt="Foto de nuevo post" className="preview-image" />
      )}
      <button
        type="button"
        onClick={upload}
        disabled={loading}
      >
        {loading? 'Subiendo...' : 'Subir'}
      </button>
      {compressed && (
        <img src={compressed} alt="Foto de nuevo post" className="preview-image" />
      )}
    </div>
  );
}

export default NewPost;