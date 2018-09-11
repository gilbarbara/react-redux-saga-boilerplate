/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/client';

import { ActionTypes } from 'constants/index';

/**
 * getUsers
 *
 * @param {Object} action
 *
 */
export function* getUsers({ payload }) {
  try {
    const response = yield call(request, `https://api.github.com/search/users?q=${payload.query}&in=login`);
    yield put({
      type: ActionTypes.GITHUB_GET_USERS_SUCCESS,
      payload: { data: response.items },
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GITHUB_GET_USERS_FAILURE,
      payload: err,
    });
  }
}

/**
 * getUser
 *
 * @param {Object} action
 *
 */
export function* getUser({ payload }) {
  try {
    const [user, repos] = yield all([
      call(request, `https://api.github.com/users/${payload.user}`),
      call(request, `https://api.github.com/users/${payload.user}/repos?sort=updated`),
    ]);

    yield put({
      type: ActionTypes.GITHUB_GET_USER_SUCCESS,
      payload: { user },
    });
    yield put({
      type: ActionTypes.GITHUB_GET_REPOS_SUCCESS,
      payload: { repos },
    });
  }
  catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GITHUB_GET_USER_FAILURE,
      payload: err,
    });
    yield put({
      type: ActionTypes.GITHUB_GET_REPOS_FAILURE,
      payload: err,
    });
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.GITHUB_GET_USERS, getUsers),
    takeLatest(ActionTypes.GITHUB_GET_USER, getUser),
  ]);
}
