import React from 'react';
import './ModalExample.css'; 
interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <p>{message}</p>
        <button className='btn modal-btn' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
