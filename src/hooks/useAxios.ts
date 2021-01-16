import { createContext, useContext } from 'react';
import axios from 'axios';
import config from '../config';
import { autorun } from 'mobx';
import rootStore from '../store';

const axiosInstance = axios.create({
  baseURL: `https://us-central1-${config.firebase.projectId}.cloudfunctions.net/api/`,
});

const axiosContext = createContext(axiosInstance);

const { authStore } = rootStore;

autorun(() => {
  if (authStore.token) {
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${authStore.token}`;
  } else {
    axiosInstance.defaults.headers.common['Authorization'] = undefined;
  }
});

export const useAxios = () => {
  return useContext(axiosContext);
};
