import React, { useEffect } from 'react';
import { app } from '../draft/index';

const Draft: React.FC = () => {
  const pixiRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (pixiRef.current?.children) {
      pixiRef.current.appendChild(app.view);
    }
  }, [pixiRef]);

  return <div ref={pixiRef}></div>;
};

export default Draft;
