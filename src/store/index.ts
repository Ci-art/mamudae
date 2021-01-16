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

const rootStore = new RootStore();
export default rootStore;
