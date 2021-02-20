import React from 'react';
import { Button } from './Button';
import { Modal, ModalProps } from './Modal';

export interface UserRolesModalProps extends ModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export const UserRolesModal: React.VFC<UserRolesModalProps> = React.memo(
  (props) => {
    const { visible } = props;

    return (
      <Modal visible>
        <Button title="확인" onClick={props.onConfirm}></Button>
        <Button title="닫기" onClick={props.onClose}></Button>
      </Modal>
    );
  }
);
