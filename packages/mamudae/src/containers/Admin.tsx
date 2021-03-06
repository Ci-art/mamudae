import React, { useState } from 'react';
import { UserRequest, UserResult, Role } from 'mamudae-core';
import rootStore from '../store';
import { useAutorun } from '../hooks/useAutorun';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useFunctions } from './../hooks/useFunctions';
import { UserRolesModal } from '../components/UserRolesModal';

export const Admin: React.VFC = () => {
  const { authStore } = rootStore;

  const [selectUser, setSelectUser] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);

  const [{ data, loading }, refetch] = useFunctions<{
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
    <>
      <UserRolesModal
        user={data?.users.find((user) => {
          return user.uid === selectUser;
        })}
        visible={modalVisible}
        onConfirm={(value) =>
          update({
            url: `users/${selectUser}`,
            data: { roles: value },
          }).then(refetch)
        }
        onClose={() => {
          setModalVisible(false);
        }}
      />
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
              <p>
                역할:
                {(() => {
                  if (!value.roles || !Array.isArray(value.roles)) {
                    return <></>;
                  }
                  return value.roles.filter((role) => role.value === true).map((role, index) => <p key={index}>{Role[index]}</p>);
                })()}
              </p>
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
