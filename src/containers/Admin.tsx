import { autorun } from 'mobx';
import React, { useEffect } from 'react';
import rootStore from '../store';
import { useAxios } from './../hooks/useAxios';

export const Admin: React.VFC = () => {
  const { authStore } = rootStore;
  const axiosInstance = useAxios();

  useEffect(() =>
    autorun(() => {
      if (authStore.isLogin) {
        axiosInstance.get('users').then((value) => {
          console.log(value.data);
        });
      }
    })
  );

  return <div></div>;
};
