import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { HelmetProvider } from 'react-helmet-async';

import { showAlert } from 'actions';
import { store, persistor } from 'store/index';

import Loader from 'components/Loader';
import Reload from 'components/Reload';

import App from './App';
import { register } from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader size={100} block />} persistor={persistor}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

/* istanbul ignore next */
register({
  onUpdate: () => {
    store.dispatch(showAlert(<Reload />, { id: 'sw-update', icon: 'bolt', timeout: 0 }));
  },
});
