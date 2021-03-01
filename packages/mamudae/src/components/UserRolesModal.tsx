import React from 'react';
import { Role, UserResult } from 'mamudae-core';
import { Button } from './Button';
import { Modal, ModalProps } from './Modal';

export interface UserRolesModalProps extends ModalProps {
  user?: UserResult;
  onConfirm: () => void;
  onClose: () => void;
}

export const UserRolesModal: React.VFC<UserRolesModalProps> = React.memo(
  (props) => {
    const { user, visible } = props;

    return (
      <Modal visible={visible}>
        {getRolesList}
        <div className="">
          <Button title="확인" onClick={props.onConfirm}></Button>
          <Button title="닫기" onClick={props.onClose}></Button>
        </div>
      </Modal>
    );
  }
);

const getRolesList = () => {
  const roles = Object.keys(Role);

  return roles.slice(0, roles.length / 2);
};
