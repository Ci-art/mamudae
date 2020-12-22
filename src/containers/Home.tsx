import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { Header } from '../components/Header';
import { Post } from '../components/Post';
import { useStore } from '../store';

export default function Home() {
  const { postStore } = useStore();

  useEffect(() => {
    const unsubscription = postStore.onSnapshot();

    return () => {
      unsubscription();
    };
  }, [postStore]);

  const PostList = observer(() => {
    return (
      <div>
        {postStore.posts.map((value) => {
          return <Post key={value.id} data={value} />;
        })}
      </div>
    );
  });

  return (
    <div>
      <Header />
      <Container>
        <PostList />
      </Container>
    </div>
  );
}
