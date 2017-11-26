import immutable from 'immutability-helper';
import { createReducer } from 'modules/helpers';
import { parseError } from 'modules/connect';

import { ActionTypes } from 'constants/index';

export const githubState = {
  repos: {
    data: {},
    state: 'idle',
    message: '',
    query: '',
  },
};

export default {
  github: createReducer(githubState, {
    [ActionTypes.GITHUB_GET_REPOS_REQUEST](state, { payload }) {
      const data = state.repos.data[payload.query] ? state.repos.data[payload.query] : [];

      return immutable(state, {
        repos: {
          data: {
            [payload.query]: { $set: data },
          },
          message: { $set: '' },
          query: { $set: payload.query },
          state: { $set: 'running' },
        },
      });
    },
    [ActionTypes.GITHUB_GET_REPOS_SUCCESS](state, { payload }) {
      return immutable(state, {
        repos: {
          data: {
            [state.repos.query]: { $set: payload.data || [] },
          },
          state: { $set: 'loaded' },
        },
      });
    },
    [ActionTypes.GITHUB_GET_REPOS_FAILURE](state, { payload }) {
      return immutable(state, {
        repos: {
          state: { $set: 'error' },
          message: { $set: parseError(payload.message) },
        },
      });
    },
  }),
};
