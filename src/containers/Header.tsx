import React from 'react';
import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom';
import paths from '../constants/paths.json';
import { observer } from 'mobx-react-lite';
import rootStore from '../store';

export const Header: React.VFC = () => {
  const { authStore } = rootStore;
  const history = useHistory();

  const onLogin = () => {
    history.push(paths.LOGIN);
  };

  const onLogout = () => {
    authStore.logout();
  };

  const AuthButton = observer(() => {
    if (!authStore.isLoading) {
      if (authStore.isLogin) {
        return <Button title="로그아웃" color="danger" onClick={onLogout} />;
      } else {
        return <Button title="로그인" onClick={onLogin} />;
      }
    } else {
      return <></>;
    }
  });

  return (
    <header className="bg-white border-b border-gray-200 shadow">
      <div className="container flex items-center flex-wrap h-16">
        <div className="flex flex-auto items-start flex-no-shrink mr-6">
          <Link
            className="font-bold text-black text-opacity-90 text-2xl"
            to={paths.HOME}
          >
            메무대
          </Link>
        </div>
        <div>
          <AuthButton></AuthButton>
        </div>
      </div>
    </header>
  );
};
