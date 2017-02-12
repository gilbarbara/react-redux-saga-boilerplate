import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import createLogger from 'redux-logger';
import Reactotron from 'reactotron-react-js';
import createReactotronTrackingEnhancer from 'reactotron-redux';

import rootSagas from 'sagas';
import rootReducer from 'reducers';
import { ActionTypes } from 'constants/index';

import browserHistory from 'modules/history';

const reducer = combineReducers({ ...rootReducer, routing: routerReducer });
const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  // predicate: (getState, action) => (action.type.indexOf('_REQUEST') === -1),
  collapsed: true
});

/* istanbul ignore next */
const newStore = (initialState = {}) => {
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, sagaMiddleware, routerMiddleware(browserHistory), logger),
    createReactotronTrackingEnhancer(Reactotron, {
      isActionImportant: action => action.type === ActionTypes.USER_LOGIN_SUCCESS
    })
  )(createStore);

  const store = createStoreWithMiddleware(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  sagaMiddleware.run(rootSagas);

  if (module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(require('reducers').default);
    });
  }

  return store;
};

export default newStore;
