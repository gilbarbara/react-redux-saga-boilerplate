import { expectSaga } from 'redux-saga-test-plan';

import { ActionTypes } from 'literals';

import githubReducer from 'reducers/github';
import github, { getRepos } from 'sagas/github';

import githubRepos from 'test/__fixtures__/github-repos.json';
import { mergeState } from 'test-utils';

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
      payload: { query: 'react' },
    };
    const initialState = () => ({
      github: githubReducer.github(undefined, initialAction),
    });

    it('should handle SUCCESS', () => {
      fetchMock.mockResponse(JSON.stringify({ items: githubRepos.items.slice(0, 2) }));

      return expectSaga(getRepos, {
        type: ActionTypes.GITHUB_GET_REPOS_REQUEST,
        payload: { query: 'react' },
      })
        .withReducer(initialState)
        .run()
        .then(result => {
          expect(result.toJSON()).toMatchSnapshot();
        });
    });

    it('should handle SUCCESS with cache', () => {
      fetchMock.mockResponse(JSON.stringify({ items: githubRepos.items.slice(0, 2) }));

      return expectSaga(getRepos, {
        type: ActionTypes.GITHUB_GET_REPOS_REQUEST,
        payload: { query: 'react' },
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
        .run()
        .then(result => {
          expect(result.toJSON()).toMatchSnapshot();
        });
    });

    it('should handle FAILURE', () => {
      fetchMock.mockReject(new Error('Failed to fetch'));

      return expectSaga(getRepos, {
        type: ActionTypes.GITHUB_GET_REPOS_REQUEST,
        payload: { query: 'react' },
      })
        .withReducer(initialState)
        .run()
        .then(result => {
          expect(result.toJSON()).toMatchSnapshot();
        });
    });
  });
});
