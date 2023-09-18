import React, { useEffect } from 'react';
import InsuranceTable from '../insuranceTable/InsuranceTable';
import InsuranceForm from '../insuranceForm/InsuranceForm';
import { connect } from 'react-redux';
import { logout } from '../../redux/authActions';
import { useNavigate } from 'react-router-dom';
import { addOffer, loadOffers } from '../../redux/offerActions';
import Layout from '../layout/Layout';

const UserAccountPage: React.FC = ({
  offers,
  loadOffers,
  logOut,
  addOffer,
  userEmail,
}: any) => {
  const navigate = useNavigate();

  const handleInsuranceFormSubmit = async (formData: any) => {
    const isValid = validateFormData(formData);

    if (isValid) {
      addOffer(formData);
    }
  };

  const validateFormData = (formData: any) => {
    return formData ? true : false;
  };

  const handleLogout = () => {
    navigate('/');
    logOut();
  };

  useEffect(() => {
    const fetchDataAndLoadOffers = async () => {
      try {
        await loadOffers();
      } catch (error) {
        console.error('Error loading offers:', error);
      }
    };

    fetchDataAndLoadOffers();
  }, [loadOffers]);

  return (
    <Layout>
      <div className="accountContainer">
        <div className="d-flex align-items-center justify-content-between">
          <h2>Welcome {userEmail}</h2>
          <button onClick={handleLogout} className="logoutBtn">
            Logout
          </button>
        </div>
        <InsuranceForm onSubmit={handleInsuranceFormSubmit} />
        <InsuranceTable data={offers} />
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: any) => {
  return { offers: state.offers.offers, userEmail: state.auth.userEmail };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addOffer: (offerData: any) => dispatch(addOffer(offerData)),
    loadOffers: () => dispatch(loadOffers()),
    logOut: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountPage);
