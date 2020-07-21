import React from 'react';
import LoginForm from '../LoginForm.js';

const AuthPage = ({ setUser, loginService }) => {
  return (
    <LoginForm
      setUser={setUser}
      login={loginService.login} />
  );
};

export default AuthPage;