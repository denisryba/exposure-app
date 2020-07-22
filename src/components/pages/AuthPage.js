import React from 'react';
import LoginForm from '../LoginForm.js';
import { useHistory, useLocation } from 'react-router-dom';
import storage from '../../utils/storage.js';
import { useAuth } from '../../context/auth.js';

const AuthPage = ({ setUser, loginService }) => {
  const history = useHistory();
  const location = useLocation();
  const user = useAuth();
  const { from } = location.state || { from: '/' };

  if (user) {
    history.replace('/');
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password
      });
      storage.set('savedUser', user);
      setUser(user);
      history.replace(from);
    }
    catch (e) {
      console.log('wrong user data');
    }
  };

  return (
    <LoginForm
      login={login} />
  );
};

export default AuthPage;