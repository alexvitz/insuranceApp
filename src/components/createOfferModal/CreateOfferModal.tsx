import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

interface CreateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateOfferModal: React.FC<CreateOfferModalProps> = ({
  isOpen,
  onClose,
}) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(!isAuthenticated);

  const closeModal = () => {
    setShowModal(false);
    navigate('/');
  };

  const loginAndCloseModal = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <div>
      {showModal && (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <h2>You can continue only if you login!</h2>
          <div className="d-flex justify-content-center w-100">
            <button onClick={closeModal} className="closeBtn">
              Cancel
            </button>
            <button onClick={loginAndCloseModal} className="button ms-3">
              Login
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CreateOfferModal;
