import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/utils/LoadingSpinner";
import ToastAlertContainer from "../components/utils/ToastAlertContainer";
import useUploadService from "../services/uploadService";
import { useNavigate } from "react-router-dom";
import './Admin.css';

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [filename, setFilename] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const [name, setName] = useState(undefined);

  const [toasts, setToasts] = useState([]);
  const addToast = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const navigate = useNavigate();
  const { getPfpSignature, dataURLtoBlob, createProfilePicture } = useUploadService();

  useEffect(() => {
    const load = async () => {
      try {
        await getPfpSignature();
        setLoading(false);
      } catch {
        navigate("/");
      }
    }
    load();
  }, []);

  async function submit(e) {
    e?.preventDefault();
    if(!file) return;
    try {
      setLoading(true);
      const blob = dataURLtoBlob(file);
      await createProfilePicture(blob, name);
      addToast("Profile logo creado", "success");
    } catch (err) {
      console.error('Error creando nuevo profile logo:', err);
      addToast('Error creando profile logo', 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleImageSelect = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files[0];
      if (file) {
        setFilename(file.name);
        console.log('File selected:', file.name)
        const reader = new FileReader();
        reader.onload = async () => {
          const base64String = reader.result;
          setFile(base64String);
        };
        await reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error('Error cargando imagen:', err);
      addToast("Error cargando imagen", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <main className="admin-container">
      <LoadingSpinner />
    </main>
  );

  return (
    <main className="admin-container">
      <ToastAlertContainer toasts={toasts} onRemoveToast={removeToast} />
      <form className="new-pfp-form">
        <h3>Cargar nuevo ícono de perfil</h3>
        <label htmlFor="newPfpImage">Imagen*:</label>
        <input
          id="newPfpImage"
          name="image"
          type="file"
          accept="image/*"
          required
          onChange={handleImageSelect}
        />
        {filename && <p className="selected-file">Archivo seleccionado: {filename}</p>}
        <label htmlFor="newPfpName">Nombre:</label>
        <input
          id="newPfpName"
          name="name"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e?.target?.value)}
        />
        <button disabled={loading || !file} onClick={submit}>Cargar</button>
      </form>
      <Footer />
    </main>
  );
};

export default Admin;