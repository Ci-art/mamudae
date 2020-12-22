import React from 'react';
import { AuthStore } from './authStore';
import { PostStore } from './postStore';

export class RootStore {
  authStore: AuthStore;
  postStore: PostStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.postStore = new PostStore(this);
  }
}

const storeContext = React.createContext(new RootStore());
export const useStore = () => React.useContext(storeContext);
