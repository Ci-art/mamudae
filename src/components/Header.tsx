import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import paths from '../constants/paths.json';
import { useStore } from '../store';

export const Header: React.FC = () => {
  const { authStore } = useStore();
  const history = useHistory();

  const AuthButton = observer(() => {
    if (!authStore.isLoading) {
      if (authStore.token) {
        return (
          <Button
            color="danger"
            onClick={() => {
              authStore.logout();
            }}
          >
            로그아웃
          </Button>
        );
      } else {
        return (
          <Button
            color="primary"
            onClick={() => {
              history.push(paths.LOGIN);
            }}
          >
            로그인
          </Button>
        );
      }
    } else {
      return <div></div>;
    }
  });

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">메무대</NavbarBrand>
          <Nav className="flex-row mr-auto" navbar>
            <NavItem>
              <Link className="nav-link p-2" to={paths.HOME}>
                밴픽
              </Link>
            </NavItem>
          </Nav>
          <AuthButton></AuthButton>
        </Container>
      </Navbar>
    </div>
  );
};
