import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './ProfileEdit.css';
import { useProfile } from "../context/ProfileContext";
import useUserService from "../services/userService";
import LoadingSpinner from "../components/utils/LoadingSpinner";
import ToastAlertContainer from "../components/utils/ToastAlertContainer";
import { Link } from "react-router-dom";

const ProfileIconSelector = ({ profilePictureId, onError, onSuccess }) => {
  const { setProfile } = useProfile();
  const { getProfilePictures, updateProfilePicture } = useUserService();
  const [profilePicture, setProfilePicture] = useState(profilePictureId);
  const [availablePictures, setAvailablePictures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getProfilePictures();
        setAvailablePictures(data);
      } catch (err) {
        console.error("Error editando perfil:", err);
        onError('Error cargando íconos de perfil disponibles');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handlePictureSelect = (e, pictureId) => {
    e?.preventDefault();
    if (loading) return;
    setProfilePicture(pictureId);
  };

  const submitEdit = async (e) => {
    e?.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      if (profilePictureId !== profilePicture) {
        const newProfile = await updateProfilePicture(profilePicture);
        console.log(newProfile);
        setProfile(newProfile);
      }
      onSuccess('Perfil actualizado');
    } catch (err) {
      console.error("Error editando perfil:", err);
      onError("Error editando perfil");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="profile-icon-selector spinner-container">
      <LoadingSpinner label=""/>
    </div>
  );

  return (
    <div className="profile-icon-selector">
      <div className="profile-icons-grid">
        {availablePictures.map((picture) => (
          <button
            type="button"
            key={picture?.id}
            className={
              "select-icon-button" +
              (picture?.id === profilePicture ? " selected" : "")
            }
            onClick={(e) => handlePictureSelect(e, picture?.id)}
            disabled={loading}
          >
            <img
              src={picture?.url || "./placeholder.png"}
              alt={picture?.name || "Ícono de perfil"}
            />
          </button>
        ))}
      </div>
      <div className="profile-edition-actions">
        <button
          type="button"
          className="profile-edition-action profile-save-button"
          onClick={submitEdit}
          disabled={loading}
        >
          Guardar
        </button>
        <Link
          className="profile-edition-action profile-discard-button"
          to={"/profile"}
          disabled={loading}
        >
          Descartar
        </Link>
      </div>
    </div>
  );
}

const ProfileEdit = () => {
  const { profile } = useProfile();

  const [toasts, setToasts] = useState([]);
  const addToast = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const onError = (err) => addToast(err, 'error');
  const onSuccess = (msg) => addToast(msg, "success");

  return (
    <main className="profile-edition-container">
      <Header />
      <ToastAlertContainer toasts={toasts} onRemoveToast={removeToast} />
      <ProfileIconSelector
        profilePictureId={profile?.profilePicture?.id}
        onError={onError}
        onSuccess={onSuccess}
      />
      <Footer currentPage={"profile"} />
    </main>
  );
};

export default ProfileEdit;