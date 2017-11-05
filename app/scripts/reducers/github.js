import update from 'immutability-helper';
import { createReducer } from 'modules/helpers';

import { ActionTypes } from 'constants/index';

export const githubState = {
  repos: {
    data: [],
    error: false,
    isRunning: false,
    message: '',
    q: '',
  },
};

export default {
  github: createReducer(githubState, {
    [ActionTypes.GITHUB_GET_REPOS_REQUEST](state, { payload }) {
      return update(state, {
        repos: {
          error: { $set: false },
          isRunning: { $set: true },
          message: { $set: '' },
          q: { $set: payload.q },
        },
      });
    },
    [ActionTypes.GITHUB_GET_REPOS_SUCCESS](state, { payload }) {
      return update(state, {
        repos: {
          data: { $set: payload.data || [] },
          isRunning: { $set: false },
        },
      });
    },
    [ActionTypes.GITHUB_GET_REPOS_FAILURE](state, { payload }) {
      return update(state, {
        repos: {
          error: { $set: true },
          isRunning: { $set: false },
          message: { $set: payload.message },
        },
      });
    },
  }),
};
