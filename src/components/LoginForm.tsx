import React, { useState } from 'react';
import { Form, FormGroup, FormProps, Input, Label } from 'reactstrap';
import { useStore } from '../store';
import { LoadingButton } from './LoadingButton';

export interface LoginFormProps extends FormProps {
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
        <Label for="username">아이디</Label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </FormGroup>
      <LoadingButton disabled={props.isLoading}>로그인</LoadingButton>
    </Form>
  );
};
