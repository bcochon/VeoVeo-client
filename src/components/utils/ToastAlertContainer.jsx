import React from "react";
import ToastAlert from "./ToastAlert";
import "./ToastAlertContainer.css";

export default function ToastAlertContainer({ toasts, onRemoveToast = () => {} }) {

  return (
    <div className="toast-container fixed-top">
      {toasts.map((toast) => (
        <ToastAlert
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemoveToast(toast.id)}
        />
      ))}
    </div>
  );
}
