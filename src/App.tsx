import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from '../src/components/welcomePage/WelcomePage';
import CreateAccountPage from '../src/components/createAccountPage/CreateAccountPage';
import AccountPage from './components/accountPage/AccountPage';
import LoginPage from './components/loginPage/LoginPage';
import { initDB } from './utils/db';

function App() {
  const handleInitDB = async () => {
    await initDB();
  };

  useEffect(() => {
    handleInitDB();
  }, []);

  return (
    <Routes>
      <Route path="/" Component={WelcomePage} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/create-account" Component={CreateAccountPage} />
      <Route path="/account" Component={AccountPage} />
    </Routes>
  );
}

export default App;
