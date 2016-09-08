import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils/helpers';

import { ActionTypes } from 'constants/index';

export const userState = {
  logged: false,
  rehydrated: false
};

export default {
  user: createReducer(userState, {
    [REHYDRATE](state, action) {
      if (action.payload.user) {
        return Object.assign({}, state, action.payload.user, {
          rehydrated: true
        });
      }

      return { ...state };
    },
    [ActionTypes.USER_LOGIN_SUCCESS](state) {
      return { ...state, logged: true };
    },
    [ActionTypes.USER_LOGOUT_SUCCESS](state) {
      return { ...state, logged: false };
    }
  })
};
