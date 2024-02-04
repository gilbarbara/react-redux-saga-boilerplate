import { expectSaga } from 'redux-saga-test-plan';
import { mergeState } from 'test-utils';

import { getRepos } from '~/actions';
import github, { getReposSaga } from '~/sagas/github';

import githubReducer from '~/store/slices/github';

import githubRepos from 'test/__fixtures__/github-repos.json';

describe('github', () => {
  it('should have the expected watchers', () =>
    expectSaga(github)
      .run({ silenceTimeout: true })
      .then(result => {
        expect(result.toJSON()).toMatchSnapshot();
      }));

  describe('getRepos', () => {
    const initialAction = getRepos('react');
    const initialState = () => ({ github: githubReducer(undefined, initialAction) });

    it('should handle SUCCESS', async () => {
      fetchMock.mockResponse(JSON.stringify({ items: githubRepos.items.slice(0, 2) }));

      const result = await expectSaga(getReposSaga, initialAction).withReducer(initialState).run();

      expect(result.toJSON()).toMatchSnapshot();
    });

    it('should handle SUCCESS with cache', async () => {
      fetchMock.mockResponse(JSON.stringify({ items: githubRepos.items.slice(0, 2) }));

      const result = await expectSaga(getReposSaga, initialAction)
        .withReducer(
          mergeState({
            github: {
              topics: {
                react: {
                  ...initialState().github.topics.react,
                  data: githubRepos.items.slice(0, 2),
                  updatedAt: 12345680000,
                },
              },
            },
          }),
        )
        .run();

      expect(result.toJSON()).toMatchSnapshot();
    });

    it('should handle FAILURE', async () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      const result = await expectSaga(getReposSaga, initialAction).withReducer(initialState).run();

      expect(result.toJSON()).toMatchSnapshot();
    });
  });
});
