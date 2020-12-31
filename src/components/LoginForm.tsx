import React, { useState } from 'react';
import { useStore } from '../store';
import { Button } from './Button';
import { Form } from './Form';
import { FormGroup } from './FormGroup';
import { Input } from './Input';

export interface LoginFormProps {
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { authStore } = useStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        authStore.login(username, password);
      }}
    >
      <FormGroup>
        <label className="flex-1" htmlFor="username">
          아이디
        </label>
        <Input
          className="flex-2"
          type="text"
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <label className="flex-1" htmlFor="password">
          비밀번호
        </label>
        <Input
          className="flex-2"
          type="password"
          id="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </FormGroup>
      <Button className="w-full" title="로그인" isLoading={props.isLoading} />
    </Form>
  );
};
