import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/authActions';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import '../../styles/styles.scss';

const LoginPage: React.FC = ({ login }: any) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      try {
        login(email, password).then(() => {
          navigate('/account');
        });
      } catch (error) {
        alert('Invalid email or password');
      }
    }
  };

  return (
    <Layout>
      <div className="loginContainer">
        <h2>Connect to your account</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button onClick={handleLogin} className="button mt-1">
          Login
        </button>
        <div>
          Don't have an account?
          <Link to="/create-account" className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.loggedUserID,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (email: any, password: any) => dispatch(login(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
