import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import rootStore from '../store';
import { Post } from '../components/Post';

export const PostList: React.VFC = observer(() => {
  const { postStore } = rootStore;

  useEffect(() => {
    const unsubscription = postStore.onSnapshot();

    return () => {
      unsubscription();
    };
  }, [postStore]);

  return (
    <div className="space-y-4">
      {postStore.posts.map((value) => {
        return <Post key={value.id} data={value} />;
      })}
    </div>
  );
});
