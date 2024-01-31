import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  const devMiddlewares = require('./middlewares-dev').default;

  middlewares.push(...devMiddlewares);
}

export default middlewares;
