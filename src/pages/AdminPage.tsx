import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '../containers/Header';

const AdminPage: React.FC = () => {
  axios
    .get('')
    .then((value) => {
      console.log(value);
    });

  return (
    <>
      <Helmet>
        <title>관리 - 메무대</title>
      </Helmet>
      <Header />
      관리자
    </>
  );
};

export default AdminPage;
