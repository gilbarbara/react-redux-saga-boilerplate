import update from 'immutability-helper';
import { createReducer } from 'utils/helpers';
import { ActionTypes } from 'constants/index';

export const appState = {
  notifications: {
    visible: false,
    message: '',
    status: '',
    withTimeout: true,
  },
};

export default {
  app: createReducer(appState, {
    [ActionTypes.SHOW_ALERT](state, action) {
      return update(state, {
        notifications: {
          $set: {
            ...appState.notifications,
            visible: true,
            message: action.message,
            status: action.status,
            withTimeout: action.withTimeout === true,
          },
        },
      });
    },
    [ActionTypes.HIDE_ALERT](state) {
      return update(state, {
        notifications: {
          $set: appState.notifications,
        },
      });
    },
  }),
};
