import { delay } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import user, { login, logout } from 'sagas/user';

describe('user', () => {
  it('should have the expected watchers', () =>
    expectSaga(user)
      .run({ silenceTimeout: true })
      .then(result => {
        expect(result.toJSON()).toMatchSnapshot();
      }));

  describe('login', () => {
    it('should handle SUCCESS', () =>
      expectSaga(login)
        .provide([[matchers.call.fn(delay), throwError(new Error('fail'))]])
        .run(400)
        .then(result => {
          expect(result.toJSON()).toMatchSnapshot();
        }));
  });

  describe('logout', () => {
    it('should handle SUCCESS', () =>
      expectSaga(logout)
        .run({ silenceTimeout: true })
        .then(result => {
          expect(result.toJSON()).toMatchSnapshot();
        }));
  });
});
