/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import {
  RouteConfig,
  renderRoutes,
  RouteConfigComponentProps,
} from 'react-router-config';
import paths from './constants/paths.json';

function Root({ route }: RouteConfigComponentProps) {
  return renderRoutes(route && route.routes);
}

const Home = React.lazy(() =>
  import(/* webpackChunkName: "Home" */ './pages/HomePage')
);

const Admin = React.lazy(() =>
  import(/* webpackChunkName: "Admin" */ './pages/AdminPage')
);

const Login = React.lazy(() =>
  import(/* webpackChunkName: "Login" */ './pages/LoginPage')
);

const routes: RouteConfig[] = [
  {
    component: Root,
    routes: [
      {
        path: paths.HOME,
        exact: true,
        component: Home,
      },
      {
        path: paths.ADMIN,
        component: Admin,
      },
      {
        path: paths.LOGIN,
        component: Login,
      },
    ],
  },
];

export default function Routes() {
  return (
    <React.Suspense fallback={<div />}>{renderRoutes(routes)}</React.Suspense>
  );
}
