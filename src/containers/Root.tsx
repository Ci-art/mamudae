import React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

const Root: React.VFC<RouteConfigComponentProps> = (props) => {
  return renderRoutes(props.route && props.route.routes);
};

export default Root;
