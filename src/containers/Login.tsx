import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { LoginForm } from '../components/LoginForm';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { useHistory } from 'react-router-dom';
import { autorun } from 'mobx';
import paths from '../constants/paths.json';
import { Card } from '../components/Card';
import { CardTitle } from '../components/CardTitle';

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
    <div className="container flex justify-center items-center h-screen">
      <Helmet>
        <title>로그인 - 메무대</title>
      </Helmet>
      <Card>
        <CardTitle>로그인</CardTitle>
        <Observer>
          {() => {
            return <LoginForm isLoading={authStore.isLoading} />;
          }}
        </Observer>
      </Card>
    </div>
  );
};

export default Login;
