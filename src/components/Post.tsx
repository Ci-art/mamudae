import React from 'react';
import { PostData } from '../store/postStore';
import { Card, CardBody, CardHeader, CardText } from 'reactstrap';

export interface PostProps {
  data: PostData;
}

export const Post: React.FC<PostProps> = (props) => {
  return (
    <Card>
      <CardHeader tag="h5">{props.data.title}</CardHeader>
      <CardBody>
        <CardText>{props.data.content}</CardText>
      </CardBody>
    </Card>
  );
};
