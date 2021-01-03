import React from 'react';
import { Helmet } from 'react-helmet';
import { Login } from '../containers/Login';

const LoginPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>로그인 - 메무대</title>
      </Helmet>
      <Login />
    </>
  );
};

export default LoginPage;
