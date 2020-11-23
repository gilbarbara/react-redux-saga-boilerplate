import React from 'react';
import { Provider } from 'react-redux';
import { Middleware, Store } from 'redux';
import { render, RenderResult } from '@testing-library/react';
import deepmerge from 'deepmerge';
import { PartialDeep } from 'type-fest';

import { initialState } from 'reducers';
import { configStore } from 'store';

import { StoreState } from 'types';

type NavigateOptions = {
  pathname?: string;
  search?: string;
  hash?: string;
};

function customRender(
  ui: React.ReactElement,
  options: Record<string, any> = {},
): RenderResult & {
  store: Store<StoreState>;
} {
  const { actions = [], mockDispatch, ...rest } = options;

  const middleware: Middleware[] = [];

  if (mockDispatch) {
    middleware.push(() => next => action => {
      if (!action.type.startsWith('persist/')) {
        mockDispatch(action);
      }

      next(action);
    });
  }
  const { store } = configStore({}, middleware);

  actions.forEach(d => store.dispatch(d));

  if (mockDispatch) {
    // mockDispatch.mockClear();
  }

  return {
    ...render(ui, { wrapper: getProviders(store), ...rest }),
    store,
  };
}

export const emptyAction = { type: '', payload: {} };

export function navigate(options: NavigateOptions): void {
  const { pathname = location.pathname, search, hash } = options;
  let url = `${location.protocol}//${location.host}${pathname}`;

  if (search) {
    url += `?${search}`;
  }

  if (hash) {
    url += `#${hash}`;
  }

  // @ts-ignore
  jsdom.reconfigure({ url });
}

function getProviders(store): React.FC {
  return ({ children }) => <Provider store={store}>{children}</Provider>;
}

export function mergeState(patch: PartialDeep<StoreState> = {}) {
  return () => deepmerge(initialState, patch);
}

export * from '@testing-library/react';

export { customRender as render };
