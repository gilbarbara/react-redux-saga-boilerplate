import { expectSaga } from 'redux-saga-test-plan';

import github, { getRepos } from 'sagas/github';
import { ActionTypes } from 'constants/index';

jest.mock('modules/client', () => ({
  request: () => ({ items: [] }),
}));

describe('github', () => {
  it('should have the expected watchers', done => expectSaga(github)
    .run({ silenceTimeout: true })
    .then(saga => {
      expect(saga).toMatchSnapshot();
      done();
    }));

  it('should have the repos saga', () => expectSaga(getRepos, { payload: { query: 'react' } })
    .put({
      type: ActionTypes.GITHUB_GET_REPOS_SUCCESS,
      payload: {
        data: [],
      },
    })
    .run());
});
