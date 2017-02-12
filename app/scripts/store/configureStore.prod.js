import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import rootSagas from 'sagas';
import rootReducer from 'reducers';

import browserHistory from 'modules/history';

const reducer = combineReducers({ ...rootReducer, routing: routerReducer });
const sagaMiddleware = createSagaMiddleware();

export default (initialState = {}) => {
  const createStoreWithMiddleware = applyMiddleware(thunk, sagaMiddleware, routerMiddleware(browserHistory))(createStore);
  const store = createStoreWithMiddleware(reducer, initialState);
  sagaMiddleware.run(rootSagas);

  return store;
};
