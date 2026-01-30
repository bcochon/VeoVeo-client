import React, { useState } from "react";
import { subscribeToPush } from "../services/pushService.js";
import Modal from "./utils/Modal.jsx";
import { useNavigate } from 'react-router-dom';

const AllowNotifications = () => {
  const [modal, setModal] = useState({ 
    isOpen: false,
    onClose: () => {}
  });
  const navigate = useNavigate();

  const closeModal = () => {setModal({ isOpen: false, onClose: () => {} })};

  const enablePush = async () => {
    try {
      console.log("Llamando a push service...");
      await subscribeToPush();
      setModal({
        isOpen: true,
        title: '¡Notificaciones activadas!',
        message: 'Ya puedes recibir notificaciones de tus alertas en este dispositivo',
        cancelText: 'Cerrar',
        confirmText: 'Ver alertas',
        onConfirm: () => navigate('/'),
        onClose: closeModal,
        variant: 'success'
      })
    } catch (err) {
      console.error("Error activando notificaciones: ", err);
      setModal({
        isOpen: true,
        title: 'Ups...',
        message: 'Hubo un error al activar las notificaciones. Intentá nuevamente',
        cancelText: 'Cancelar',
        confirmText: 'Reintentar',
        onConfirm: () => {
          closeModal();
          enablePush();
        },
        onClose: closeModal,
        variant: 'danger'
      })
    }
  };

  return (
    <>
      <button onClick={enablePush}>Activar notificaciones Push</button>
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        onConfirm={modal.onConfirm}
        title={modal.title}
        message={modal.message}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
        variant={modal.variant}
      />
    </>
  );
};

export default AllowNotifications;
