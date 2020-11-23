import { REHYDRATE } from 'redux-persist';

import { createReducer } from 'modules/helpers';

import { ActionTypes } from 'literals';

import { AppState } from 'types';

export const appState: AppState = {
  alerts: [],
};

export default {
  app: createReducer<AppState>(
    {
      [REHYDRATE]: draft => {
        draft.alerts = [];
      },
      [ActionTypes.HIDE_ALERT]: (draft, { payload: { id } }) => {
        draft.alerts = draft.alerts.filter(d => d.id !== id);
      },
      [ActionTypes.SHOW_ALERT]: (draft, { payload }) => {
        draft.alerts.push(payload);
      },
    },
    appState,
  ),
};
