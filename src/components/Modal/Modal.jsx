import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
      <div className={css.overlay} onClick={handleOverlayClick}>
        <div className={css.module}>
          <img src={image} alt="" />
        </div>
      </div>
  );
};

export default Modal;

