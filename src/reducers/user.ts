import { createReducer } from 'modules/helpers';

import { ActionTypes, STATUS } from 'literals';

import { UserState } from 'types';

export const userState = {
  isAuthenticated: false,
  status: STATUS.IDLE,
};

export default {
  user: createReducer<UserState>(
    {
      [ActionTypes.USER_LOGIN_REQUEST]: draft => {
        draft.status = STATUS.RUNNING;
      },
      [ActionTypes.USER_LOGIN_SUCCESS]: draft => {
        draft.isAuthenticated = true;
        draft.status = STATUS.READY;
      },
      [ActionTypes.USER_LOGOUT_REQUEST]: draft => {
        draft.status = STATUS.RUNNING;
      },
      [ActionTypes.USER_LOGOUT_SUCCESS]: draft => {
        draft.isAuthenticated = false;
        draft.status = STATUS.IDLE;
      },
    },
    userState,
  ),
};
