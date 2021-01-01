/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { RouteConfig, renderRoutes } from 'react-router-config';
import paths from './constants/paths.json';
import Root from './containers/Root';

const Home = React.lazy(() =>
  import(/* webpackChunkName: "Home" */ './containers/Home')
);

const Login = React.lazy(() =>
  import(/* webpackChunkName: "Login" */ './containers/Login')
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
