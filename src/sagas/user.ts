/**
 * @module Sagas/User
 * @desc User
 */

import { all, delay, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'literals';

/**
 * Login
 */
export function* login() {
  yield delay(400);

  yield put({
    type: ActionTypes.USER_LOGIN_SUCCESS,
  });
}

/**
 * Logout
 */
export function* logout() {
  yield delay(200);

  yield put({
    type: ActionTypes.USER_LOGOUT_SUCCESS,
  });
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.USER_LOGIN_REQUEST, login),
    takeLatest(ActionTypes.USER_LOGOUT_REQUEST, logout),
  ]);
}
