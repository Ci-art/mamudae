import React, { useState } from 'react';
import rootStore from '../store';
import { UserResult } from '../../functions/src/types';
import { useAutorun } from '../hooks/useAutorun';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useFunctions } from './../hooks/useFunctions';
import { UserRequest } from './../../functions/src/types';
import { Modal } from '../components/Modal';

export const Admin: React.VFC = () => {
  const { authStore } = rootStore;

  const [selectUser, setSelectUser] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);

  const [{ data, loading, error }, refetch] = useFunctions<{
    users: UserResult[];
  }>('users');
  const [{ data: updateData, loading: updateLoading }, update] = useFunctions<{
    user: UserRequest;
  }>({ method: 'PATCH' }, { manual: true });

  useAutorun(() => {
    if (!authStore.isLoading) {
      refetch();
    }
  });

  return (
    <>
      <Modal visible={modalVisible}>
        {JSON.stringify(
          data?.users.find((user) => {
            return user.uid === selectUser;
          })?.roles
        )}
        <Button
          title="확인"
          onClick={() =>
            update({
              url: `users/${selectUser}`,
              data: { roles: { admin: true } },
            })
          }
        ></Button>
        <Button
          title="닫기"
          onClick={() => {
            setModalVisible(false);
          }}
        ></Button>
      </Modal>
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
                onClick={() => {
                  setSelectUser(value.uid);
                  setModalVisible(true);
                }}
              ></Button>
            </Card>
          );
        })}
      </div>
    </>
  );
};
