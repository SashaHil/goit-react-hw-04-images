import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, OnModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onCloseModal, largeImage, tags }) => {
  const handleCloseBackdrop = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleCloseEsc = e => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };
    document.addEventListener('keydown', handleCloseEsc);
    return () => {
      document.removeEventListener('keydown', handleCloseEsc);
    };
  }, [onCloseModal]);

  return createPortal(
    <Overlay onClick={handleCloseBackdrop}>
      <OnModal>
        <img src={largeImage} alt={tags} />
      </OnModal>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
