import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';
import './ToastAlert.css';

export default function ToastAlert({ message, type, onClose }) {
  const configs = {
    success: {
      icon: CheckCircle,
      className: 'toast-success'
    },
    error: {
      icon: XCircle,
      className: 'toast-error'
    },
    warning: {
      icon: AlertTriangle,
      className: 'toast-warning'
    }
  };

  const config = configs[type] || configs.success;
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${config.className}`}>
      <Icon className="toast-icon" size={20} />
      <p className="toast-message">{message}</p>
      <button onClick={onClose} className="toast-close">
        <X size={18} />
      </button>
    </div>
  );
};