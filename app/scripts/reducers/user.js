import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';

import { ActionTypes } from 'constants/index';

export const userState = {
  isAuthenticated: false,
  status: 'idle',
};

export default {
  user: handleActions({
    [ActionTypes.USER_LOGIN]: (state) => immutable(state, {
      status: { $set: 'running' },
    }),
    [ActionTypes.USER_LOGIN_SUCCESS]: (state) => immutable(state, {
      isAuthenticated: { $set: true },
      status: { $set: 'idle' },
    }),
    [ActionTypes.USER_LOGOUT]: (state) => immutable(state, {
      status: { $set: 'running' },
    }),
    [ActionTypes.USER_LOGOUT_SUCCESS]: (state) => immutable(state, {
      isAuthenticated: { $set: false },
      status: { $set: 'idle' },
    }),
  }, userState),
};
