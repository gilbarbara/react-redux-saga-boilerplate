// Polyfills
import 'core-js/shim';
import 'isomorphic-fetch';
import 'classlist-polyfill';
import 'vendor/polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/Root';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { syncHistoryWithStore } from 'react-router-redux';

import store from 'store';
import '../styles/main.scss';

const history = syncHistoryWithStore(browserHistory, store);

function renderApp(RootComponent) {
  const target = document.getElementById('react');
  /* istanbul ignore if  */
  if (target) {
    ReactDOM.render(
      <AppContainer>
        <RootComponent store={store} history={history} />
      </AppContainer>,
      target
    );
  }
}

setTimeout(() => {
  renderApp(Root);
}, 100);

/* istanbul ignore if  */
if (module.hot) {
  /* istanbul ignore next */
  module.hot.accept(
    'containers/Root',
    () => renderApp(require('containers/Root'))
  );
}
