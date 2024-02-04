import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Action, Middleware } from '@reduxjs/toolkit';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { deepmerge } from 'deepmerge-ts';
import { PartialDeep } from 'type-fest';
import { Mock } from 'vitest';

import theme from '~/modules/theme';

import { initialState, store } from '~/store';
import { addMiddleware, resetMiddlewares } from '~/store/dynamic-middlewares';
import { RootState } from '~/types';

type NavigateOptions = {
  hash?: string;
  pathname?: string;
  search?: string;
};

interface CustomRenderOptions extends RenderOptions {
  actions?: any[];
  mockDispatch?: Mock;
  path?: string;
  pathname?: string;
  resetStore?: boolean;
}

function customRender(
  ui: React.ReactElement,
  options?: CustomRenderOptions,
): RenderResult & {
  store: typeof store;
} {
  const { actions = [], mockDispatch, path, pathname, resetStore = true, ...rest } = options || {};

  resetMiddlewares();

  if (resetStore) {
    store.dispatch({ type: 'RESET_STORE' });
  }

  const middlewares: Middleware[] = [];

  if (mockDispatch) {
    middlewares.push(dispatchMiddleware(mockDispatch));
  }

  addMiddleware(...middlewares);

  actions.forEach(d => store.dispatch(d));

  return {
    ...render(ui, { wrapper: getWrapper(path, pathname), ...rest }),
    store,
  };
}

export function dispatchMiddleware(mockDispatch: Mock): Middleware<any, RootState> {
  return () => next => action => {
    const { type = '' } = action as Action;

    if (!type?.startsWith('persist/')) {
      mockDispatch(action);
    }

    next(action);
  };
}

export const emptyAction = { type: '', payload: {} };

export function getWrapper(path?: string, pathname?: string): React.FC<any> {
  return ({ children }) => {
    let content = children;

    if (path && pathname) {
      content = (
        <MemoryRouter initialEntries={[pathname]}>
          <Routes>
            <Route element={content} path={path} />
          </Routes>
        </MemoryRouter>
      );
    }

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{content}</ThemeProvider>
      </Provider>
    );
  };
}

export function navigate(options: NavigateOptions): void {
  const { location } = window;

  const { hash, pathname = location.pathname, search } = options;
  let url = `${location.protocol}//${location.host}${pathname}`;

  if (search) {
    url += `?${search}`;
  }

  if (hash) {
    url += `#${hash}`;
  }

  window.history.pushState({}, '', url);
}

export function mergeState(patch: PartialDeep<RootState> = {}) {
  return () => deepmerge(initialState, patch);
}

export * from '@testing-library/react';

export { customRender as render };
