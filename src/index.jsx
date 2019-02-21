// Polyfills
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from 'store/index';
import { showAlert } from 'actions/index';

import App from 'containers/App';
import Loader from 'components/Loader';
import Reload from 'components/Reload';

export const app = {
  cssRetries: 0,
  fetchRetries: 0,

  run() {
    this.render(App);

    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'production') {
      this.initOfflinePlugin();
    }
  },
  initOfflinePlugin() {
    const OfflinePlugin = require('offline-plugin/runtime');

    /* istanbul ignore next */
    OfflinePlugin.install({
      onUpdateReady: () => {
        OfflinePlugin.applyUpdate();
      },
      onUpdated: () => {
        store.dispatch(showAlert(<Reload />, { id: 'sw-update', icon: 'bolt', timeout: 0 }));
      },
    });
  },
  render(Component) {
    const root = document.getElementById('react');

    /* istanbul ignore next */
    if (root) {
      ReactDOM.render(
        <Provider store={store}>
          <PersistGate loading={<Loader size={100} block />} persistor={persistor}>
            <Component />
          </PersistGate>
        </Provider>,
        root,
      );
    }
  },
};

app.run();
