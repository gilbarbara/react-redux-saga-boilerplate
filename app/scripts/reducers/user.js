import update from 'immutability-helper';
import { createReducer } from 'utils/helpers';

import { ActionTypes } from 'constants/index';

export const userState = {
  isAuthenticated: false,
};

export default {
  user: createReducer(userState, {
    [ActionTypes.USER_LOGIN_SUCCESS](state) {
      return update(state, {
        isAuthenticated: { $set: true },
      });
    },
    [ActionTypes.USER_LOGOUT_SUCCESS](state) {
      return update(state, {
        isAuthenticated: { $set: false },
      });
    },
  }),
};
