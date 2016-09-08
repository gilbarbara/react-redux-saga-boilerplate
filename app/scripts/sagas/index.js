import { fork } from 'redux-saga/effects';

import user from './user';

/**
 * rootSaga
 */
export default function* root() {
  yield fork(user);
}
