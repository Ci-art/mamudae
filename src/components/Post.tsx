import React from 'react';
import { PostData } from '../store/postStore';

export interface PostProps {
  data: PostData;
}

export const Post: React.FC<PostProps> = (props) => {
  return (
    <div className="p-4 bg-white bg-opacity-70 backdrop-blur border border-gray-200 rounded-2xl transition-shadow hover:shadow-md">
      <h2 className="mb-2 font-bold text-black text-opacity-90 text-4xl">
        {props.data.title}
      </h2>
      <p>{props.data.content}</p>
    </div>
  );
};
