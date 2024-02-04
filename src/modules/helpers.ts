import { now } from '@gilbarbara/helpers';
import { createAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

import { PlainObject, RootState } from '~/types';

export function actionBody<T = any, M extends PlainObject = PlainObject>(
  payload: T,
  meta: M,
): { meta: M; payload: T };
export function actionBody<T = any>(payload: T): { meta: never; payload: T };

export function actionBody<T = any>(payload: T, meta?: any) {
  return { payload, meta };
}

/**
 * Check if cache is valid
 */
export function hasValidCache(lastUpdated: number, max = 10): boolean {
  if (!navigator.onLine) {
    return true;
  }

  return lastUpdated + max * 60 > now();
}

export const rehydrateAction = createAction<RootState>(REHYDRATE);
