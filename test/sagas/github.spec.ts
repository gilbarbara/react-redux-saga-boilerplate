import { expectSaga } from 'redux-saga-test-plan';
import { mergeState } from 'test-utils';

import { ActionTypes } from '~/literals';
import githubReducer from '~/reducers/github';
import github, { getReposSaga } from '~/sagas/github';

import githubRepos from 'test/__fixtures__/github-repos.json';

describe('github', () => {
  it('should have the expected watchers', () =>
    expectSaga(github)
      .run({ silenceTimeout: true })
      .then(result => {
        expect(result.toJSON()).toMatchSnapshot();
      }));

  describe('getRepos', () => {
    const initialAction = {
      type: ActionTypes.GITHUB_GET_REPOS_REQUEST,
      payload: 'react',
    };
    const initialState = () => ({
      github: githubReducer.github(undefined, initialAction),
    });

    it('should handle SUCCESS', async () => {
      fetchMock.mockResponse(JSON.stringify({ items: githubRepos.items.slice(0, 2) }));

      const result = await expectSaga(getReposSaga, {
        type: ActionTypes.GITHUB_GET_REPOS_REQUEST,
        payload: 'react',
      })
        .withReducer(initialState)
        .run();

      expect(result.toJSON()).toMatchSnapshot();
    });

    it('should handle SUCCESS with cache', async () => {
      fetchMock.mockResponse(JSON.stringify({ items: githubRepos.items.slice(0, 2) }));

      const result = await expectSaga(getReposSaga, {
        type: ActionTypes.GITHUB_GET_REPOS_REQUEST,
        payload: 'react',
      })
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

      const result = await expectSaga(getReposSaga, {
        type: ActionTypes.GITHUB_GET_REPOS_REQUEST,
        payload: 'react',
      })
        .withReducer(initialState)
        .run();

      expect(result.toJSON()).toMatchSnapshot();
    });
  });
});
