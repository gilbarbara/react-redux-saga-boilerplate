import { all, delay, put, takeLatest } from 'redux-saga/effects';

import { login, loginSuccess, logOut, logOutSuccess } from '~/actions';

export function* loginSaga() {
  yield delay(400);

  yield put(loginSuccess());
}

export function* logoutSaga() {
  yield delay(200);

  yield put(logOutSuccess());
}

export default function* root() {
  yield all([takeLatest(login.type, loginSaga), takeLatest(logOut.type, logoutSaga)]);
}
