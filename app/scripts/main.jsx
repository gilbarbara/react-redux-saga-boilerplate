// Polyfills
import 'core-js/shim';
import 'whatwg-fetch';
import 'classlist-polyfill';
import 'utils/polyfills';

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
  ReactDOM.render(
    <AppContainer>
      <RootComponent store={store} history={history} />
    </AppContainer>,
    document.getElementById('react')
  );
}

setTimeout(() => {
  renderApp(Root);
}, 100);

if (module.hot) {
  module.hot.accept(
    'containers/Root',
    () => renderApp(require('containers/Root'))
  );
}
