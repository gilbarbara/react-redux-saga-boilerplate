import { createReducer, original } from '@reduxjs/toolkit';

import { rehydrateAction } from 'modules/helpers';

import { hideAlert, showAlert } from 'actions';

import { AppState } from 'types';

export const appState: AppState = {
  alerts: [],
};

export default {
  app: createReducer<AppState>(appState, builder => {
    builder.addCase(rehydrateAction, (draft, { payload }) => {
      return { ...original(draft), ...payload?.app, alerts: [] } as AppState;
    });

    builder
      .addCase(hideAlert, (draft, { payload }) => {
        draft.alerts = draft.alerts.filter(d => d.id !== payload);
      })
      .addCase(showAlert, (draft, { payload }) => {
        draft.alerts.push(payload);
      });
  }),
};
