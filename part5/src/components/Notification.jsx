// src/components/Notification.jsx
import React from 'react';

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={type} id="noti">
      {message}
    </div>
  );
};

export default Notification;
