import React from 'react';
import rootStore from '../store';
import { UserResult } from '../../functions/src/types';
import { useAutorun } from '../hooks/useAutorun';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useFunctions } from './../hooks/useFunctions';
import { UserRequest } from './../../functions/src/types';

export const Admin: React.VFC = () => {
  const { authStore } = rootStore;
  const [{ data, loading, error }, refetch] = useFunctions<{
    users: UserResult[];
  }>('users');
  const [, update] = useFunctions<{
    user: UserRequest;
  }>({ method: 'PATCH' }, { manual: true });

  useAutorun(() => {
    if (!authStore.isLoading) {
      refetch();
    }
  });

  return (
    <div className="container">
      {loading || !data?.users ? (
        <p className="fixed m-auto">로딩 중</p>
      ) : (
        <></>
      )}
      <Button title="새로고침" onClick={() => refetch()}></Button>
      {data?.users.map((value) => {
        return (
          <Card key={value.uid}>
            <p>이메일: {value.email}</p>
            <p>역할: {JSON.stringify(value.roles)}</p>
            <Button
              title="역할 변경"
              onClick={() =>
                update({
                  url: `users/${value.uid}`,
                  data: { roles: { admin: true } },
                })
              }
            ></Button>
          </Card>
        );
      })}
    </div>
  );
};
