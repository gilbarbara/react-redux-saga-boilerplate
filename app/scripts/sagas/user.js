// @flow

/**
 * @module Sagas/User
 * @desc User
 */

import { delay } from 'redux-saga';
import { all, call, fork, put, take } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';
import { goTo } from 'actions';

/**
 * Login
 */
function* login() {
  try {
    yield call(delay, 400);

    yield put({
      type: ActionTypes.USER_LOGIN_SUCCESS,
    });
    yield put(goTo('/private'));
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.USER_LOGIN_FAILURE,
      payload: err,
    });
  }
}

/**
 * Logout
 */
function* logout() {
  try {
    yield call(delay, 200);

    yield put({
      type: ActionTypes.USER_LOGOUT_SUCCESS,
    });
    yield put(goTo('/'));
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.USER_LOGOUT_FAILURE,
      payload: err,
    });
  }
}

export function* watchLogin() {
  yield take(ActionTypes.USER_LOGIN_REQUEST);
  yield call(login);
}

export function* watchLogout() {
  yield take(ActionTypes.USER_LOGOUT_REQUEST);
  yield call(logout);
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
  ]);
}
