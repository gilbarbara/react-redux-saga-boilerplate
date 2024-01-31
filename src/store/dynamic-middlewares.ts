import { compose, Middleware, MiddlewareAPI } from 'redux';

export const createDynamicMiddlewares = () => {
  let allDynamicMiddlewares: Middleware[] = [];
  let allAppliedDynamicMiddlewares: Middleware[] = [];
  let store: MiddlewareAPI;

  const enhancer: Middleware = _store => {
    store = _store;

    return next => action => {
      // @ts-ignore
      return compose(...allAppliedDynamicMiddlewares)(next)(action);
    };
  };

  const addMiddleware = (...middlewares: Middleware[]) => {
    // TODO: Fix this
    // @ts-ignore
    allAppliedDynamicMiddlewares.push(...middlewares.map(middleware => middleware(store)));
    allDynamicMiddlewares.push(...middlewares);
  };

  const removeMiddleware = (middleware: Middleware) => {
    const index = allDynamicMiddlewares.findIndex(d => d === middleware);

    if (index === -1) {
      // eslint-disable-next-line no-console
      console.error('Middleware does not exist!', middleware);

      return;
    }

    allDynamicMiddlewares = allDynamicMiddlewares.filter((_, mdwIndex) => mdwIndex !== index);
    allAppliedDynamicMiddlewares = allAppliedDynamicMiddlewares.filter(
      (_, mdwIndex) => mdwIndex !== index,
    );
  };

  const resetMiddlewares = () => {
    allAppliedDynamicMiddlewares = [];
    allDynamicMiddlewares = [];
  };

  return {
    enhancer,
    addMiddleware,
    removeMiddleware,
    resetMiddlewares,
  };
};

const dynamicMiddlewaresInstance = createDynamicMiddlewares();

export default dynamicMiddlewaresInstance.enhancer;

export const { addMiddleware, removeMiddleware, resetMiddlewares } = dynamicMiddlewaresInstance;
