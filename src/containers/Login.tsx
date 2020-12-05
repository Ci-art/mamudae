import React, { useEffect } from 'react';
import { LoginForm } from '../components/LoginForm';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { Card, CardBody, CardHeader, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { autorun } from 'mobx';
import paths from '../constants/paths.json';

const Login: React.FC = () => {
  const { authStore } = useStore();
  const history = useHistory();

  useEffect(() => {
    const reactionDisposer = autorun(() => {
      if (authStore.isLogin) {
        history.push(paths.HOME);
      }
    });
    return () => {
      reactionDisposer();
    };
  }, [authStore.isLogin, history]);

  return (
    <Container>
      <Card>
        <CardHeader>로그인</CardHeader>
        <CardBody>
          <Observer>
            {() => {
              return <LoginForm isLoading={authStore.isLoading} />;
            }}
          </Observer>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Login;
