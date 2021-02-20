import React from 'react';
import { PostData } from '../store/postStore';
import { Card } from './Card';
import { CardTitle } from './CardTitle';

export interface PostProps {
  data: PostData;
}

export const Post: React.FC<PostProps> = (props) => {
  return (
    <Card>
      <CardTitle>{props.data.title}</CardTitle>
      <p>{props.data.content}</p>
    </Card>
  );
};
