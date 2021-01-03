import React from 'react';
import { Header } from '../containers/Header';
import { PostList } from '../containers/PostList';

export const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container my-4">
        <PostList />
      </div>
    </>
  );
};

export default HomePage;
