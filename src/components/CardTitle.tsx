import React from 'react';

export const CardTitle: React.FC = (props) => {
  return (
    <>
      <h2 className="font-bold text-black text-opacity-90 text-3xl">
        {props.children}
      </h2>
      <hr className="my-2 border-gray-200" />
    </>
  );
};
