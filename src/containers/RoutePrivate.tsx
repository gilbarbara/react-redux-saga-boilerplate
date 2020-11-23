import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { RouteProps } from 'types';

function RoutePrivate({ component: Component, isAuthenticated, to = '/', ...rest }: RouteProps) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: to,
              state: { redirect: props.location.pathname, isAuthenticated },
            }}
          />
        )
      }
    />
  );
}

export default RoutePrivate;
