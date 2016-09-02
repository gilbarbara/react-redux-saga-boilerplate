// @flow

/**
 * @module Sagas/App
 * @desc App
 */

import { takeEvery, delay } from 'redux-saga';
import { put, call, fork } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';
import { goTo } from 'actions';

/**
 * Login
 */
function* login() {
  try {
    yield call(delay, 1000);

    yield put({
      type: ActionTypes.USER_LOGIN_SUCCESS
    });
    yield put(goTo('/private'));
  }
  catch (err) {
    yield put({
      type: ActionTypes.USER_LOGIN_FAILURE,
      payload: err
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
      type: ActionTypes.USER_LOGOUT_SUCCESS
    });
    yield put(goTo('/'));
  }
  catch (err) {
    yield put({
      type: ActionTypes.USER_LOGOUT_FAILURE,
      payload: err
    });
  }
}

/**
 * Clear localStorage
 */
function* clearLocalStorage() {
  try {
    const data = yield call(localStorage.clear);

    yield put({
      type: ActionTypes.CLEAR_STORAGE_SUCCESS,
      payload: data
    });
  }
  catch (err) {
    yield put({
      type: ActionTypes.CLEAR_STORAGE_FAILURE,
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

function* watchClearLocalStorage() {
  yield* takeEvery(ActionTypes.CLEAR_STORAGE_REQUEST, clearLocalStorage);
}

/**
 * App Sagas
 */
export default function* app() {
  yield fork(watchLogin);
  yield fork(watchLogout);
  yield fork(watchClearLocalStorage);
}
