import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { checkStatus } from 'utils/routerInterceptor';

import App from 'containers/App';
import AppPublic from 'containers/AppPublic';
import AppPrivate from 'containers/AppPrivate';

import Home from 'containers/Home';
import Logged from 'containers/Logged';
import NotFound from 'containers/NotFound';

export default function createRoutes() {
  return (
    <Route path="/" component={App}>
      <Route component={AppPublic}>
        <IndexRoute component={Home} onEnter={checkStatus} />
      </Route>
      <Route component={AppPrivate}>
        <Route path="private" component={Logged} onEnter={checkStatus} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  );
}
