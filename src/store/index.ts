import React from 'react';
import { AuthStore } from './authStore';

export class RootStore {
  authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore(this);
  }
}

const storeContext = React.createContext(new RootStore());
export const useStore = () => React.useContext(storeContext);
