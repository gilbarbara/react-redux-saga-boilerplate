import { all, fork } from 'redux-saga/effects';

import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(user),
  ]);
}
