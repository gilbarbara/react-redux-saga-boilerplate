import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import history from 'modules/history';

export const sagaMiddleware = createSagaMiddleware();

const middleware = [
  routerMiddleware(history),
  sagaMiddleware,
];

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  const invariant = require('redux-immutable-state-invariant').default;

  middleware.push(invariant());
  middleware.push(createLogger({ collapsed: true }));
}

export default middleware;
