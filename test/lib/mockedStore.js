import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

const middlewares = [createSagaMiddleware];
export default configureMockStore(middlewares);
