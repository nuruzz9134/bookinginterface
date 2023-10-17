import React from 'react'
import { useState } from 'react';
import {FaWindowClose} from 'react-icons/fa';
import './Common.css'

const Noti_Popup = ({message,onClose}) => {

  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    isVisible && (
      <div className = 'custom-notification'>
        <div className="custom-notification-message">{message}</div>
        <div className='close-logo'>
          <button className="custom-notification-dismiss" onClick={handleDismiss}>
            <FaWindowClose/>
          </button>
        </div>
      </div>
    )
  );


}

export default Noti_Popup