import immutable from 'immutability-helper';
import { createReducer } from 'modules/helpers';

import { ActionTypes } from 'constants/index';

export const userState = {
  isAuthenticated: false,
  status: 'idle',
};

export default {
  user: createReducer(userState, {
    [ActionTypes.USER_LOGIN_REQUEST](state) {
      return immutable(state, {
        status: { $set: 'running' },
      });
    },
    [ActionTypes.USER_LOGIN_SUCCESS](state) {
      return immutable(state, {
        isAuthenticated: { $set: true },
        status: { $set: 'idle' },
      });
    },
    [ActionTypes.USER_LOGOUT_REQUEST](state) {
      return immutable(state, {
        status: { $set: 'running' },
      });
    },
    [ActionTypes.USER_LOGOUT_SUCCESS](state) {
      return immutable(state, {
        isAuthenticated: { $set: false },
        status: { $set: 'idle' },
      });
    },
  }),
};
