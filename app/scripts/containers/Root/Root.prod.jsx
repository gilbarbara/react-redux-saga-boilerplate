import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createRoutes from 'routes';

/* istanbul ignore next */
const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history} routes={createRoutes()} />
  </Provider>
);

Root.propTypes = {
  history: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
};

export default Root;
