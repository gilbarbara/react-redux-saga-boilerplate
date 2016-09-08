import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { REHYDRATE } from 'redux-persist/constants';
import createActionBuffer from 'redux-action-buffer';

import createLogger from 'redux-logger';
import Reactotron from 'reactotron-react-js';
import createReactotronTrackingEnhancer from 'reactotron-redux';

import rootSagas from 'sagas';
import rootReducer from 'reducers';
import DevTools from 'components/DevTools';
import { ActionTypes } from 'constants/index';

const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routerReducer
}));
const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  // predicate: (getState, action) => (action.type.indexOf('_REQUEST') === -1),
  collapsed: true
});

/* istanbul ignore next */
const newStore = (initialState = {}) => {
  const createStoreWithMiddleware = compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory), createActionBuffer(REHYDRATE), logger),
    createReactotronTrackingEnhancer(Reactotron, {
      isActionImportant: action => action.type === ActionTypes.USER_LOGIN_SUCCESS
    }),
    DevTools.instrument()
  )(createStore);

  const store = createStoreWithMiddleware(reducer, initialState);
  sagaMiddleware.run(rootSagas);

  if (module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(require('reducers').default);
    });
  }

  return store;
};

export default newStore;
