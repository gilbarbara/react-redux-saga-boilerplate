import expect from 'expect';
import { REHYDRATE } from 'redux-persist/constants';

import reducers from 'reducers';
import { appState } from 'reducers/app';
import * as Actions from 'actions';
import { ActionTypes } from 'constants/index';

describe('App', () => {
  it('should return the initial state', () => {
    expect(reducers.app(undefined, {}))
      .toEqual(appState);
  });

  it(`should handle ${REHYDRATE} with payload`, () => {
    expect(reducers.app(undefined, { type: REHYDRATE, payload: { app: [] } }))
      .toEqual({ ...appState, rehydrated: true });
  });

  it(`should handle ${REHYDRATE} without payload`, () => {
    expect(reducers.app(undefined, { type: REHYDRATE, payload: { } }))
      .toEqual(appState);
  });

  it(`should handle ${ActionTypes.USER_LOGIN_SUCCESS}`, () => {
    expect(reducers.app(undefined, { type: ActionTypes.USER_LOGIN_SUCCESS }).logged)
      .toEqual(true);
  });

  it(`should handle ${ActionTypes.USER_LOGOUT_SUCCESS}`, () => {
    expect(reducers.app(undefined, { type: ActionTypes.USER_LOGOUT_SUCCESS }).logged)
      .toEqual(false);
  });

  it(`should handle ${ActionTypes.SHOW_ALERT}`, () => {
    expect(reducers.app(undefined, Actions.showAlert('success', 'hello')).notifications)
      .toEqual({
        status: 'success',
        message: 'hello',
        visible: true,
        withTimeout: true
      });
  });

  it(`should handle ${ActionTypes.HIDE_ALERT}`, () => {
    expect(reducers.app(undefined, Actions.hideAlert()).notifications)
      .toEqual(appState.notifications);
  });
});
