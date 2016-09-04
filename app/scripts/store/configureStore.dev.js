import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import Reactotron from 'reactotron-react-js';
import createReactotronTrackingEnhancer from 'reactotron-redux';
import createLogger from 'redux-logger';

import rootSagas from 'sagas';
import rootReducer from 'reducers';
import DevTools from 'components/DevTools';

const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routerReducer
}));
const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  // predicate: (getState, action) => (action.type.indexOf('_REQUEST') === -1),
  collapsed: true
});

/* istanbul ignore next */
export default (initialState = {}) => {
  const createStoreWithMiddleware = compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory), logger),
    createReactotronTrackingEnhancer(Reactotron, {
      isActionImportant: action => action.type === 'FORMAT_HARD_DRIVE'
    }),
    DevTools.instrument()
  )(createStore);

  const store = createStoreWithMiddleware(reducer, initialState);
  sagaMiddleware.run(rootSagas);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(require('reducers').default);
    });
  }

  return store;
};
