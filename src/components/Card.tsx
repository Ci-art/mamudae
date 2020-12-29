import React from 'react';

export interface CardProps {}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <div className="p-4 bg-white bg-opacity-70 backdrop-blur border border-gray-200 rounded-2xl transition-shadow hover:shadow-md">
      {props.children}
    </div>
  );
};
