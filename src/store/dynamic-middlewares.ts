import { uuid } from '@gilbarbara/helpers';
import type { Middleware } from '@reduxjs/toolkit';
import { compose } from '@reduxjs/toolkit';

import { RootState } from '~/types';

export const createDynamicMiddlewares = () => {
  const middlewareMap = new Map<string, Middleware<any, RootState>>();

  const addMiddleware = (...middlewares: Middleware<any, RootState>[]) => {
    middlewares.forEach(middleware => {
      middlewareMap.set(uuid(), middleware);
    });
  };

  const removeMiddleware = (middleware: Middleware<any, RootState>) => {
    const item = [...middlewareMap.entries()].find(([_, value]) => value === middleware);

    if (!item) {
      // eslint-disable-next-line no-console
      console.error('Middleware does not exist!', middleware);

      return;
    }

    middlewareMap.delete(item[0]);
  };

  const resetMiddlewares = () => {
    middlewareMap.clear();
  };

  const middleware: Middleware<any, RootState> = api => next => action => {
    const getFinalMiddleware: Middleware<{}, RootState> = store => {
      const appliedMiddleware = [...middlewareMap.values()].map(entry => entry(store));

      return compose(...appliedMiddleware);
    };

    return getFinalMiddleware(api)(next)(action);
  };

  return {
    middleware,
    addMiddleware,
    removeMiddleware,
    resetMiddlewares,
  };
};

const dynamicMiddlewaresInstance = createDynamicMiddlewares();

export default dynamicMiddlewaresInstance.middleware;

export const { addMiddleware, removeMiddleware, resetMiddlewares } = dynamicMiddlewaresInstance;
