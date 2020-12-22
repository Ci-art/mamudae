import firebase from 'firebase';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from './index';

export class PostData {
  id: string;
  title?: string;
  authorId?: string;
  content?: string;
  createdDate? = new Date();
  updatedDate? = new Date();

  constructor(id: string, title: string, authorId: string) {
    makeAutoObservable(this);
    this.id = id;
    this.title = title;
    this.authorId = authorId;
  }
}

export class PostStore {
  rootStore: RootStore;
  isLoading = true;
  posts: PostData[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false, convertDocToPost: false });
    this.rootStore = rootStore;
  }

  convertDocToPost(
    doc: firebase.firestore.QueryDocumentSnapshot<
      firebase.firestore.DocumentData
    >
  ) {
    const post = doc.data() as PostData;
    post.id = doc.id;

    return post;
  }

  // 수정해야 함.
  onSnapshot() {
    const postRef = firebase.firestore().collection('posts');
    return postRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        runInAction(() => {
          const post = this.convertDocToPost(change.doc);

          if (change.type === 'added') {
            this.posts.push(post);
          } else {
            const postIndex = this.posts.findIndex((value) => {
              return value.id === change.doc.id;
            });

            if (postIndex > -1) {
              if (change.type === 'modified') {
                this.posts[postIndex] = post;
              } else if (change.type === 'removed') {
                this.posts.slice(postIndex, 1);
              }
            }
          }
        });
      });
    });
  }
}
