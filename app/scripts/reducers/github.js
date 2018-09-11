import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';
import { parseError } from 'modules/client';

import { ActionTypes, STATUS } from 'constants/index';

export const githubState = {
  users: {
    data: {},
    status: STATUS.IDLE,
    message: '',
  },
  user: {
    data: {},
    repos: [],
    status: STATUS.IDLE,
    message: '',
  },
};

export default {
  github: handleActions({
    [ActionTypes.GITHUB_GET_REPOS]: (state) => immutable(state, {
      user: {
        repos: { $set: [] },
        message: { $set: '' },
        status: { $set: STATUS.RUNNING },
      },
    }),
    [ActionTypes.GITHUB_GET_REPOS_SUCCESS]: (state, { payload }) => immutable(state, {
      user: {
        repos: { $set: payload.repos || [] },
        status: { $set: STATUS.READY },
      },
    }),
    [ActionTypes.GITHUB_GET_REPOS_FAILURE]: (state, { payload }) => immutable(state, {
      user: {
        repos: { $set: [] },
        message: { $set: parseError(payload.message) },
        status: { $set: STATUS.ERROR },
      },
    }),
    [ActionTypes.GITHUB_GET_USERS]: (state) => immutable(state, {
      users: {
        data: { $set: [] },
        message: { $set: '' },
        status: { $set: STATUS.RUNNING },
      },
      user: {
        data: { $set: {} },
        repos: { $set: [] },
      },
    }),
    [ActionTypes.GITHUB_GET_USERS_SUCCESS]: (state, { payload }) => immutable(state, {
      users: {
        data: { $set: payload.data || [] },
        status: { $set: STATUS.READY },
      },
    }),
    [ActionTypes.GITHUB_GET_USERS_FAILURE]: (state, { payload }) => immutable(state, {
      users: {
        message: { $set: parseError(payload.message) },
        status: { $set: STATUS.ERROR },
      },
    }),
    [ActionTypes.GITHUB_GET_USER]: (state) => immutable(state, {
      user: {
        data: { $set: {} },
        message: { $set: '' },
        status: { $set: STATUS.RUNNING },
      },
    }),
    [ActionTypes.GITHUB_GET_USER_SUCCESS]: (state, { payload }) => immutable(state, {
      user: {
        data: { $set: payload.user || {} },
        status: { $set: STATUS.READY },
      },
    }),
    [ActionTypes.GITHUB_GET_USER_FAILURE]: (state, { payload }) => immutable(state, {
      user: {
        message: { $set: parseError(payload.message) },
        status: { $set: STATUS.ERROR },
      },
    }),
  }, githubState),
};
