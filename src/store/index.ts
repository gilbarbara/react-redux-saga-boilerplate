import { configureStore, Tuple } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistCombineReducers,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import reducers from '~/reducers';
import rootSaga from '~/sagas';

import { RootState } from '~/types';

import dynamicMiddlewares from './dynamic-middlewares';
import middlewares, { sagaMiddleware } from './middlewares';

const getDefaultMiddlewareOptions = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
  // thunk: false,
};

const rootReducer = persistCombineReducers<RootState>(
  {
    key: 'rrsb',
    stateReconciler: autoMergeLevel2,
    storage,
    blacklist: ['alerts'],
    timeout: 0,
  },
  reducers,
);

/* istanbul ignore next */
export const configStore = (preloadedState: any = {}) => {
  const enhancedStore = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware => {
      return new Tuple(
        ...getDefaultMiddleware(getDefaultMiddlewareOptions),
        ...middlewares,
        dynamicMiddlewares,
      );
    },
  });

  sagaMiddleware.run(rootSaga);

  return {
    persistor: persistStore(enhancedStore),
    store: enhancedStore,
  };
};

export const { persistor, store } = configStore();
