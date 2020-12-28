import React from 'react';
import { Button } from './Button';

export interface HeaderProps {
  isLoading?: boolean;
  isLogin?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isLoading = false,
  isLogin = false,
  ...props
}) => {
  const AuthButton = () => {
    if (!isLoading) {
      if (isLogin) {
        return (
          <Button title="로그아웃" color="danger" onClick={props.onLogout} />
        );
      } else {
        return <Button title="로그인" onClick={props.onLogin} />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow">
      <div className="container flex items-center flex-wrap h-16">
        <div className="flex flex-auto items-start flex-no-shrink mr-6">
          <span>메무대</span>
        </div>
        <div>
          <AuthButton></AuthButton>
        </div>
      </div>
    </header>
  );
};
