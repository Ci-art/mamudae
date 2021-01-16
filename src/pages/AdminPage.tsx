import React from 'react';
import { Helmet } from 'react-helmet';
import { Admin } from '../containers/Admin';
import { Header } from '../containers/Header';

const AdminPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>관리 - 메무대</title>
      </Helmet>
      <Header />
      관리자
      <Admin></Admin>
    </>
  );
};

export default AdminPage;
