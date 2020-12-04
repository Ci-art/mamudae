import firebase from 'firebase';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from './index';

export class AuthStore {
  rootStore: RootStore;
  isLoading = true;
  token = '';
  error = '';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  init() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();

        runInAction(() => {
          this.token = token;
          this.isLoading = false;
        });
      } else {
        runInAction(() => {
          this.token = '';
          this.isLoading = false;
        });
      }
    });
  }

  async login(username: string, password: string) {
    try {
      this.isLoading = true;
      const auth = await firebase.auth();
      await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      await auth.signInWithEmailAndPassword(username + '@ciart.xyz', password);
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = error.message;
      });
    }
  }

  async logout() {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
    }
  }
}
