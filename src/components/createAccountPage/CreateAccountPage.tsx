import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../../redux/authActions';
import Layout from '../layout/Layout';

interface CreateAccountFormData {
  email: string;
  password: string;
}

const CreateAccountPage: React.FC = ({ createAccount }: any) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateAccountFormData>({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<CreateAccountFormData>>(
    {}
  );

  const validateForm = () => {
    const errors: Partial<CreateAccountFormData> = {};

    if (!formData.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password) {
      errors.password = 'Required';
    } else if (formData.password.length < 5) {
      errors.password = 'Password must be at least 5 characters long';
    } else if (
      !/(?=.*[A-Za-z]{2})(?=.*\d{2})(?=.*[@$!%*?&])/.test(formData.password)
    ) {
      errors.password =
        'Password must contain at least 2 letters, 2 numbers, and 1 special character (@$!%*?&)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async () => {
    if (validateForm()) {
      try {
        await createAccount(formData.email, formData.password).then(() => {
          navigate('/account');
        });
      } catch (error) {
        console.error('Error creating account:', error);
      }
    }
  };

  const navigateBack = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="welcomeContainer">
        <h2>Create Account</h2>
        <form>
          <div>
            <label>Email</label>
            <div>
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input"
              />
              {formErrors.email && (
                <div className="text-danger">{formErrors.email}</div>
              )}
            </div>
          </div>
          <div>
            <label>Password</label>
            <div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="input"
              />
              {formErrors.password && (
                <div className="text-danger">{formErrors.password}</div>
              )}
            </div>
          </div>
          <div>
            <button type="button" onClick={onSubmit} className="button m-3">
              Create Account
            </button>
            <button
              type="button"
              onClick={navigateBack}
              className="logoutBtn m-3"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createAccount: (email: any, password: any) =>
      dispatch(createAccount(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountPage);
