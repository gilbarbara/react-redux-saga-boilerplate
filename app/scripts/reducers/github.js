import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';
import { parseError } from 'modules/client';

import { ActionTypes } from 'constants/index';

export const githubState = {
  repos: {
    data: {},
    status: 'idle',
    message: '',
    query: '',
  },
};

export default {
  github: handleActions({
    [ActionTypes.GITHUB_GET_REPOS]: (state, { payload }) => {
      const data = state.repos.data[payload.query] ? state.repos.data[payload.query] : [];

      return immutable(state, {
        repos: {
          data: {
            [payload.query]: { $set: data },
          },
          message: { $set: '' },
          query: { $set: payload.query },
          status: { $set: 'running' },
        },
      });
    },
    [ActionTypes.GITHUB_GET_REPOS_SUCCESS]: (state, { payload }) => immutable(state, {
      repos: {
        data: {
          [state.repos.query]: { $set: payload.data || [] },
        },
        status: { $set: 'loaded' },
      },
    }),
    [ActionTypes.GITHUB_GET_REPOS_FAILURE]: (state, { payload }) => immutable(state, {
      repos: {
        message: { $set: parseError(payload.message) },
        status: { $set: 'error' },
      },
    }),
  }, githubState),
};
