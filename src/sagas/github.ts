/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { request } from 'modules/client';
import { getUnixtime, hasValidCache } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { StoreAction } from 'types';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getRepos({ payload }: StoreAction) {
  const { query } = payload;

  try {
    const { data = [], updatedAt = 0 } = yield select(s => s.github.topics?.[query] || {});
    const hasCache = hasValidCache(updatedAt);
    let items;

    if (!hasCache) {
      ({ items = [] } = yield call(
        request,
        `https://api.github.com/search/repositories?q=${query}&sort=stars`,
      ));
    }

    yield put({
      type: ActionTypes.GITHUB_GET_REPOS_SUCCESS,
      payload: items || data,
      meta: { cached: hasCache, query, updatedAt: getUnixtime() },
    });
  } catch (err) {
    yield put({
      type: ActionTypes.GITHUB_GET_REPOS_FAILURE,
      payload: err,
      meta: { query },
    });
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.GITHUB_GET_REPOS_REQUEST, getRepos)]);
}
