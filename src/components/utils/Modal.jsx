import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import './Modal.css';

export default function Modal({ 
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger' // 'danger' | 'warn' | 'success' | 'info'
}) {
  if (!isOpen) return null;

  const config = {
    danger: {
      icon: AlertTriangle,
      iconClass: 'modal-icon-danger',
      buttonClass: 'modal-btn-danger'
    },
    warn: {
      icon: AlertTriangle,
      iconClass: 'modal-icon-danger',
      buttonClass: 'modal-btn-danger'
    },
    success: {
      icon: CheckCircle,
      iconClass: 'modal-icon-success',
      buttonClass: 'modal-btn-success'
    },
    info: {
      icon: Info,
      iconClass: 'modal-icon-info',
      buttonClass: 'modal-btn-info'
    }
  };

  const { icon: Icon, iconClass, buttonClass } = config[variant];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-content">
          <div className={`modal-icon ${iconClass}`}>
            <Icon size={32} />
          </div>

          <h2 className="modal-title">{title}</h2>
          <p className="modal-message">
            {message}
            { variant === 'danger' &&
              <span><br/>{`${(new Date()).toLocaleString()}`}</span>
            }
          </p>

          <div className="modal-actions">
            <button className="modal-btn modal-btn-cancel" onClick={onClose}>
              {cancelText}
            </button>
            {onConfirm && <button className={`modal-btn ${buttonClass}`} onClick={onConfirm}>
              {confirmText}
            </button>}
          </div>
        </div>
      </div>
    </div>
  );
};