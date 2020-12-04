import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { useStore } from './store';

function App() {
  const { authStore } = useStore();

  authStore.init();

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
