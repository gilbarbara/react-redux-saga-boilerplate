import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { RouteProps } from 'types';

function RoutePublic({
  component: Component,
  isAuthenticated,
  to = '/private',
  ...rest
}: RouteProps) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Redirect to={{ pathname: to }} /> : <Component {...props} />
      }
    />
  );
}

export default RoutePublic;
