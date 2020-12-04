import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import paths from '../constants/paths.json';
import { useStore } from '../store';
import { autorun } from 'mobx';

export const LoginForm: React.FC = () => {
  const { authStore } = useStore();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const reactionDisposer = autorun(() => {
      if (authStore.token) {
        history.push(paths.HOME);
      }
    });
    return () => {
      reactionDisposer();
    };
  }, [authStore.token, history]);

  return (
    <Container>
      <Card>
        <CardHeader>로그인</CardHeader>
        <CardBody>
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
            <Button color="primary">로그인</Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};
