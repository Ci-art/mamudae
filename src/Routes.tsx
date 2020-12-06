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
  import(/* webpackChunkName: "Home" */ './containers/Home')
);

const Login = React.lazy(() =>
  import(/* webpackChunkName: "Login" */ './containers/Login')
);

const Draft = React.lazy(() =>
  import(/* webpackChunkName: "Draft" */ './containers/Draft')
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
      {
        path: paths.DRAFT,
        component: Draft,
      },
    ],
  },
];

export default function Routes() {
  return (
    <React.Suspense fallback={<div />}>{renderRoutes(routes)}</React.Suspense>
  );
}
