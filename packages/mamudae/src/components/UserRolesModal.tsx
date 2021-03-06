import React, { useEffect, useState } from 'react';
import { Role, RoleData, UserResult } from 'mamudae-core';
import { Button } from './Button';
import { Modal, ModalProps } from './Modal';

export interface UserRolesModalProps extends ModalProps {
  user?: UserResult;
  onConfirm: (value: RoleData[]) => void;
  onClose: () => void;
}

export const UserRolesModal: React.VFC<UserRolesModalProps> = React.memo(
  (props) => {
    const { user, visible } = props;

    const [roles] = useState<string[]>(getRoles());
    const [roleData, setRoleData] = useState<RoleData[]>([]);

    useEffect(() => {
      if (user?.roles && Array.isArray(user.roles)) {
        setRoleData(user.roles);
      } else {
        setRoleData([]);
      }
    }, [user?.roles]);

    return (
      <Modal visible={visible}>
        {roles.map((role, index) => {
          return (
            <div key={role}>
              <label htmlFor={role}>{role}</label>
              <input
                id={role}
                type="checkbox"
                checked={roleData[index]?.value === true}
                onChange={(event) => {
                  setRoleData((roleData) => {
                    const newRoleData = roleData.slice();
                    newRoleData.splice(index, 1, {
                      value: event.target.checked,
                    });

                    return newRoleData;
                  });
                }}
              ></input>
            </div>
          );
        })}
        <div className="">
          <Button
            title="확인"
            onClick={() => props.onConfirm(roleData)}
          ></Button>
          <Button title="닫기" onClick={props.onClose}></Button>
        </div>
      </Modal>
    );
  }
);

const getRoles = () => {
  const roles = Object.values(Role);

  return roles.filter((value) => typeof value === 'string') as string[];
};
