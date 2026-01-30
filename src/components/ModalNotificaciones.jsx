import React from "react";
import { useNotifications } from "../context/NotificationContext";
import Modal from "../components/utils/Modal";

const ModalNotificaciones = () => {
  const { notificationsAvailable, getNotification, discardNotification } = useNotifications();

  return (
    <Modal
      isOpen={notificationsAvailable}
      onClose={getNotification()?.onClose || (() => discardNotification())}
      title={getNotification()?.content?.title || getNotification()?.notification?.content?.title}
      message={getNotification()?.content?.body || getNotification()?.notification?.content?.body}
      cancelText="Cerrar"
      variant={getNotification()?.type || "info"}
      onConfirm={getNotification()?.onConfirm}
      confirmText={getNotification()?.confirmText}
    />
  )
}

export default ModalNotificaciones;