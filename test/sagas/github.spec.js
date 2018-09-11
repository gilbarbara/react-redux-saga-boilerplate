import { expectSaga } from 'redux-saga-test-plan';

import github, { getUser } from 'sagas/github';
import { ActionTypes } from 'constants/index';

jest.mock('modules/client', () => ({
  request: () => ([]),
}));

describe('github', () => {
  it('should have the expected watchers', done => expectSaga(github)
    .run({ silenceTimeout: true })
    .then(saga => {
      expect(saga).toMatchSnapshot();
      done();
    }));

  it('should have the user saga', () => expectSaga(getUser, { payload: { user: 'vallades' } })
    .put({
      type: ActionTypes.GITHUB_GET_USER_SUCCESS,
      payload: {
        user: [],
      },
    })
    .run());
});
