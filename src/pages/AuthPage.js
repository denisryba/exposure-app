import React from 'react';
import LoginForm from '../components/Auth/LoginForm.js';
import { useHistory, useLocation } from 'react-router-dom';
import storage from '../utils/storage.js';

const AuthPage = ({ setUser, loginService }) => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: '/' };

  const login = async (username, password) => {
    const user = await loginService.login({
      username,
      password
    });
    storage.set('savedUser', user);
    setUser(user);
    history.replace(from);
  };

  return (
    <LoginForm
      login={login} />
  );
};

export default AuthPage;