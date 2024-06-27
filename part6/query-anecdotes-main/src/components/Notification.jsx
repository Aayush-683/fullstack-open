import React from 'react';
import { useNotification } from '../services/notifications';

const Notification = () => {
    const { notification } = useNotification();

    if (!notification) return null;

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 5
    }  

    return (
        <div className="notification" style={style}>
            {notification}
        </div>
    );
};

export default Notification;
