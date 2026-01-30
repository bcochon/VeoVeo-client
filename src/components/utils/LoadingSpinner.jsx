import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', label = 'Cargando...' }) => {
  return (
    <div className="loading-spinner-container">
      <span className={`loading-spinner loading-spinner-${size}`}></span>
      {label && <p className="loading-spinner-label">{label}</p>}
    </div>
  );
};

export default LoadingSpinner;
