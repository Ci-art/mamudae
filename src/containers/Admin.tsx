import React, { useState } from 'react';
import rootStore from '../store';
import { useAxios } from './../hooks/useAxios';
import { UserResult } from '../../functions/src/types';
import { useAutorun } from '../hooks/useAutorun';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const Admin: React.VFC = () => {
  const { authStore } = rootStore;
  const axiosInstance = useAxios();
  const [data, setData] = useState<UserResult[]>();

  const getUsers = () => {
    axiosInstance.get<{ users?: UserResult[] }>('users').then((value) => {
      setData(value.data.users);
    });
  };

  useAutorun(() => {
    if (authStore.isLogin) {
      getUsers();
    } else {
      setData(undefined);
    }
  });

  if (data) {
    return (
      <>
        <Button title="새로고침" onClick={getUsers}></Button>
        {data.map((value) => {
          return (
            <Card key={value.uid}>
              <p>이메일: {value.email}</p>
              <p>역할: {value.roles}</p>
              <Button title="역할 변경"></Button>
            </Card>
          );
        })}
      </>
    );
  } else {
    return <>로딩 중</>;
  }
};
