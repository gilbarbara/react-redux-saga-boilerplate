import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createRoutes from 'routes';

const Root = ({ store, history }) => (
  /* istanbul ignore next */
  <Provider store={store}>
    <div>
      <Router history={history} routes={createRoutes()} />
    </div>
  </Provider>
);

Root.propTypes = {
  history: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
};

export default Root;
