import React from 'react';
import { PostData } from '../store/postStore';

export interface PostProps {
  data: PostData;
}

export const Post: React.FC<PostProps> = (props) => {
  return <li>{JSON.stringify(props.data)}</li>;
};
