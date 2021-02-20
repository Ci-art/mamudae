import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import config from '../config';
import { autorun } from 'mobx';
import rootStore from '../store';
import {
  makeUseAxios,
  Options,
  RefetchOptions,
  ResponseValues,
} from 'axios-hooks';

const axiosInstance = axios.create({
  baseURL: `https://us-central1-${config.firebase.projectId}.cloudfunctions.net/api/`,
});

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

const useAxios = makeUseAxios({ axios: axiosInstance });

export const useFunctions = <TResponse = any, TError = any>(
  config: AxiosRequestConfig | string,
  options?: Options
): [
  ResponseValues<TResponse, TError>,
  (
    config?: AxiosRequestConfig,
    options?: RefetchOptions
  ) => AxiosPromise<TResponse>
] => {
  return useAxios(config, options);
};
