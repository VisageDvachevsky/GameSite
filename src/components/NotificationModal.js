import React from 'react';
import PropTypes from 'prop-types';
import '../styles/NotificationModal.css';

function NotificationModal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="notification-modal">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

NotificationModal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationModal;
