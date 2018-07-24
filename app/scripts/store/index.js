import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import history from 'modules/history';
import rootSaga from 'sagas';
import rootReducer from 'reducers';

import middleware, { sagaMiddleware } from './middleware';

const reducer = persistReducer(
  {
    key: 'rrsb', // key is required
    storage, // storage is now required
    whitelist: ['app', 'user'],
  },
  combineReducers({ ...rootReducer }),
);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* istanbul ignore next */
const configStore = (initialState = {}) => {
  const store = createStore(
    connectRouter(history)(reducer),
    initialState,
    composeEnhancer(
      applyMiddleware(...middleware),
    ),
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(require('reducers').default);
    });
  }

  return {
    persistor: persistStore(store),
    store,
  };
};

const { store, persistor } = configStore();

global.store = store;

export { store, persistor };
