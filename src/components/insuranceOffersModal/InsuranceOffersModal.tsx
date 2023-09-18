import React from 'react';
import Modal from 'react-modal';

interface InsuranceOffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  offers: { company: string; offer: string }[];
}

const InsuranceOffersModal: React.FC<InsuranceOffersModalProps> = ({
  isOpen,
  onClose,
  offers,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Insurance Offers Modal"
      className="Modal"
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      <h3>Insurance Offers</h3>
      <ul>
        {offers.map((offer, index) => (
          <li key={index}>
            <span className="companyOffer">{offer.company}</span>:
            <span className="priceOffer"> {offer.offer}</span>
          </li>
        ))}
      </ul>
      <button onClick={onClose} className="closeBtn">
        Close
      </button>
    </Modal>
  );
};

export default InsuranceOffersModal;
