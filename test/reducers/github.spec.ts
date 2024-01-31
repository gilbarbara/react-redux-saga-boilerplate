// import { emptyAction } from 'test-utils';

import { getRepos } from '../../src/actions';
import { ActionTypes } from '../../src/literals';
import reducer from '../../src/reducers/github';

describe('Github', () => {
  it('should return the initial state', () => {
    expect(reducer.github(undefined, { type: '', payload: {} })).toMatchSnapshot();
  });

  describe('GITHUB_GET_REPOS', () => {
    it('should handle REQUEST', () => {
      expect(reducer.github(undefined, getRepos('react'))).toMatchSnapshot();
    });

    it('should handle SUCCESS', () => {
      const initialState = reducer.github(undefined, getRepos('react'));

      expect(
        reducer.github(initialState, {
          type: ActionTypes.GITHUB_GET_REPOS_SUCCESS,
          payload: {
            data: [{ name: 'one' }],
          },
          meta: {
            query: 'react',
            updatedAt: 1234567890,
          },
        }),
      ).toMatchSnapshot();
    });

    it('should handle FAILURE', () => {
      const initialState = reducer.github(undefined, getRepos('react'));

      expect(
        reducer.github(initialState, {
          type: ActionTypes.GITHUB_GET_REPOS_FAILURE,
          payload: {
            message: 'Something failed',
          },
          meta: {
            query: 'react',
          },
        }),
      ).toMatchSnapshot();
    });
  });
});
