import { expectSaga } from 'redux-saga-test-plan';

import user, { login, logout } from 'sagas/user';
import { ActionTypes } from 'constants/index';

describe('user', () => {
  it('should have the expected watchers', done => {
    expectSaga(user)
      .run({ silenceTimeout: true })
      .then(saga => {
        expect(saga).toMatchSnapshot();
        done();
      });
  });

  it('should match the login saga', () =>
    expectSaga(login)
      .delay(400)
      .put({
        type: ActionTypes.USER_LOGIN_SUCCESS,
      })
      .run(500));

  it('should match the logout saga', () =>
    expectSaga(logout)
      .delay(200)
      .put({
        type: ActionTypes.USER_LOGOUT_SUCCESS,
      })
      .run());
});
