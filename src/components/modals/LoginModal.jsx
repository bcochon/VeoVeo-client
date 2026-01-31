import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";

const LoginModal = () => {
  const { loginModal } = useAuth();
  const navigate = useNavigate();

  const onConfirm = () => {
    loginModal?.onClose();
    navigate("/login");
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
      confirmText={loginModal?.confirmText}
    />
  );
}

export default LoginModal;