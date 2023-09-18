import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.scss';
import Layout from '../layout/Layout';
import CreateOfferModal from '../createOfferModal/CreateOfferModal';

const WelcomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="welcomeContainer">
        <h1>Welcome to the Insurance App</h1>

        <Link to="/login" className="link">
          Login
        </Link>
        <button className="sendFormBtn" onClick={() => openModal()}>
          Create Offer
        </button>
        <CreateOfferModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </Layout>
  );
};

export default WelcomePage;
