import React, { useEffect } from 'react';
import './Notification.scss';
import crossIcon from '../../assets/cross.png';
import checkIcon from '../../assets/check.png';

function Notification({ message, type, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        {type === 'success' && (
          <img src={checkIcon} alt="Success" className="icon success" />
        )}
        {type === 'error' && (
          <img src={crossIcon} alt="Error" className="icon error" />
        )}
        <span className="message">{message}</span>
      </div>
    </div>
  );
}

export default Notification;
