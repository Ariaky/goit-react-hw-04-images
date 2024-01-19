import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ showModal, image, onClose }) => {
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

  return (
      <div className={css.overlay} onClick={onClose}>
        <div className={css.module}>
          <img src={image} alt="" />
        </div>
      </div>
  );
};

export default Modal;

