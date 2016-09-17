import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils/helpers';

import { ActionTypes } from 'constants/index';

export const appState = {
  notifications: {
    visible: false,
    message: '',
    status: '',
    withTimeout: true
  },
  rehydrated: false
};

export default {
  app: createReducer(appState, {
    [REHYDRATE](state, action) {
      return Object.assign({}, state, action.payload.app, {
        notifications: appState.notifications,
        rehydrated: true
      });
    },
    [ActionTypes.SHOW_ALERT](state, action) {
      const notifications = {
        ...state.notifications,
        visible: true,
        message: action.message,
        status: action.status,
        withTimeout: action.withTimeout === true
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
