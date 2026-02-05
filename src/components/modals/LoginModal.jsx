import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";
import Modal from "../utils/Modal";

const LoginModal = () => {
  const [modalLoading, setModalLoading] = useState(false);
  const { loginModal, loginWithRedirect, loading } = useAuth();

  const login = async () => {
    setModalLoading(true);
    if (Capacitor.isNativePlatform())
      Browser.addListener("browserFinished", () => {
        console.log("Login finished");
        setModalLoading(false);
      });
    await loginWithRedirect();
  };

  const onConfirm = () => {
    if (modalLoading) return;
    loginModal?.onClose();
    login();
  }

  return (
    <Modal
      isOpen={loginModal?.isOpen}
      onClose={loginModal?.onClose}
      title={loginModal?.title}
      message={loginModal?.message}
      cancelText={loginModal?.cancelText}
      variant={loginModal?.variant}
      onConfirm={onConfirm}
      confirmText={
        modalLoading || loading ? "Cargando..." : loginModal?.confirmText
      }
    />
  );
}

export default LoginModal;