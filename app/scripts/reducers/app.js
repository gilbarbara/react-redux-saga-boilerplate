import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils/helpers';

import { ActionTypes } from 'constants/index';
import config from 'config';

export const appState = {
  storageVersion: config.storageVersion,
  notifications: {
    visible: false,
    message: '',
    status: '',
    withTimeout: true
  },
  logged: false,
  rehydrated: false,
  visits: 0
};

export default {
  app: createReducer(appState, {
    [REHYDRATE](state, action) {
      if (action.payload.app && action.payload.app.storageVersion === config.storageVersion) {
        return Object.assign({}, state, action.payload.app, {
          notifications: appState.notifications,
          rehydrated: true,
          visits: action.payload.app.visits++
        });
      }

      return { ...state };
    },
    [ActionTypes.USER_LOGIN_SUCCESS](state) {
      return { ...state, logged: true };
    },
    [ActionTypes.USER_LOGOUT_SUCCESS](state) {
      return { ...state, logged: false };
    },
    [ActionTypes.SHOW_ALERT](state, action) {
      const notifications = {
        ...state.notifications,
        visible: true,
        message: action.message,
        status: action.status,
        withTimeout: action.withTimeout !== undefined || true
      };

      return { ...state, notifications };
    },
    [ActionTypes.HIDE_ALERT](state) {
      const notifications = {
        ...state.notifications,
        visible: false,
        withTimeout: true
      };

      return { ...state, notifications };
    }
  })
};
