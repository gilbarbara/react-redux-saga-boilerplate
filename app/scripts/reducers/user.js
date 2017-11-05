import immutable from 'immutability-helper';
import { createReducer } from 'modules/helpers';

import { ActionTypes } from 'constants/index';

export const userState = {
  isAuthenticated: false,
  isRunning: false,
};

export default {
  user: createReducer(userState, {
    [ActionTypes.USER_LOGIN_REQUEST](state) {
      return immutable(state, {
        isRunning: { $set: true },
      });
    },
    [ActionTypes.USER_LOGIN_SUCCESS](state) {
      return immutable(state, {
        isAuthenticated: { $set: true },
        isRunning: { $set: false },
      });
    },
    [ActionTypes.USER_LOGOUT_REQUEST](state) {
      return immutable(state, {
        isRunning: { $set: true },
      });
    },
    [ActionTypes.USER_LOGOUT_SUCCESS](state) {
      return immutable(state, {
        isAuthenticated: { $set: false },
        isRunning: { $set: false },
      });
    },
  }),
};
