import React, { useEffect } from 'react';
import '../styles/LoadingModal.css';

function LoadingModal({ onLoaded }) {
  useEffect(() => {
    const loadingTime = Math.random() * (6500 - 4000) + 4000;
    const timer = setTimeout(() => {
      onLoaded();
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <div className="modal-overlay">
      <div className="loading-modal">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default LoadingModal;
