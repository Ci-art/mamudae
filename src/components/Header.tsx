import React from 'react';
import { observer } from 'mobx-react-lite';
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import paths from '../constants/paths.json';
import { useStore } from '../store';

export const Header: React.FC = () => {
  const { authStore } = useStore();
  const history = useHistory();

  const AuthButton = observer(() => {
    if (!authStore.isLoading) {
      if (authStore.isLogin) {
        return (
          <button
            className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            onClick={() => {
              authStore.logout();
            }}
          >
            로그아웃
          </button>
        );
      } else {
        return (
          <button
            className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            onClick={() => {
              history.push(paths.LOGIN);
            }}
          >
            로그인
          </button>
        );
      }
    } else {
      return <div></div>;
    }
  });

  return (
    <div>
      <Navbar color="light" light expand="md">
        <div className="container">
          <NavbarBrand href="/">메무대</NavbarBrand>
          <Nav className="flex-row mr-auto" navbar>
            <NavItem>
              <Link className="nav-link p-2" to={paths.HOME}>
                밴픽
              </Link>
            </NavItem>
          </Nav>
          <AuthButton></AuthButton>
        </div>
      </Navbar>
    </div>
  );
};
