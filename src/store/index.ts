import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import reducers from 'reducers';
import rootSaga from 'sagas';

import { StoreState } from 'types';

import middleware, { sagaMiddleware } from './middleware';

const rootReducer = persistCombineReducers<StoreState>(
  {
    key: 'rrsb',
    stateReconciler: autoMergeLevel2,
    storage,
    whitelist: ['app', 'user'],
    timeout: 0,
  },
  reducers,
);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* istanbul ignore next */
export const configStore = (initialState: any = {}, additionalMiddleware: Middleware[] = []) => {
  const store: Store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(...additionalMiddleware, ...middleware)),
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return {
    persistor: persistStore(store),
    store,
  };
};
