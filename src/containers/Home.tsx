import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import { Post } from '../components/Post';
import paths from '../constants/paths.json';
import { useStore } from '../store';

export const Home: React.FC = observer(() => {
  const { authStore, postStore } = useStore();
  const history = useHistory();

  useEffect(() => {
    const unsubscription = postStore.onSnapshot();

    return () => {
      unsubscription();
    };
  }, [postStore]);

  const PostList = observer(() => {
    return (
      <div className="space-y-4">
        {postStore.posts.map((value) => {
          return <Post key={value.id} data={value} />;
        })}
      </div>
    );
  });

  const onLogin = () => {
    history.push(paths.LOGIN);
  };

  const onLogout = () => {
    authStore.logout();
  };

  return (
    <>
      <Header
        isLoading={authStore.isLoading}
        isLogin={authStore.isLogin}
        onLogin={onLogin}
        onLogout={onLogout}
      />
      <div className="container my-4">
        <PostList />
      </div>
    </>
  );
});

export default Home;
