import React from 'react';
import rootStore from '../store';
import { UserResult } from '../../functions/src/types';
import { useAutorun } from '../hooks/useAutorun';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useFunctions } from './../hooks/useFunctions';

export const Admin: React.VFC = () => {
  const { authStore } = rootStore;
  const [{ data, loading, error }, refetch] = useFunctions<{
    users: UserResult[];
  }>('users');

  useAutorun(() => {
    if (!authStore.isLoading) {
      refetch();
    }
  });

  return (
    <>
      {loading ? <p>로딩 중</p> : <></>}
      <Button title="새로고침" onClick={() => refetch()}></Button>
      {data?.users.map((value) => {
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
};
