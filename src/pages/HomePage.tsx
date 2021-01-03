import React from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '../containers/Header';
import { PostList } from '../containers/PostList';

export const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>메무대</title>
      </Helmet>
      <Header />
      <div className="container my-4">
        <PostList />
      </div>
    </>
  );
};

export default HomePage;
