// @flow

/**
 * @module Sagas/User
 * @desc User
 */

import { takeEvery, delay } from 'redux-saga';
import { put, call, fork } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';
import { goTo } from 'actions';

/**
 * Login
 */
export function* login() {
  try {
    yield call(delay, 1000);

    yield put({
      type: ActionTypes.USER_LOGIN_SUCCESS
    });
    yield put(goTo('/private'));
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.USER_LOGIN_FAILURE,
      payload: err
    });
  }
}

/**
 * Logout
 */
export function* logout() {
  try {
    yield call(delay, 200);

    yield put({
      type: ActionTypes.USER_LOGOUT_SUCCESS
    });
    yield put(goTo('/'));
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.USER_LOGOUT_FAILURE,
      payload: err
    });
  }
}

function* watchLogin() {
  yield* takeEvery(ActionTypes.USER_LOGIN_REQUEST, login);
}

function* watchLogout() {
  yield* takeEvery(ActionTypes.USER_LOGOUT_REQUEST, logout);
}

/**
 * User Sagas
 */
export default function* app() {
  yield fork(watchLogin);
  yield fork(watchLogout);
}
