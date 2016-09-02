import expect from 'expect';

import reducers from 'reducers/index';
import { appState } from 'reducers/app';
import * as Actions from 'actions/index';
import { ActionTypes } from 'constants/index';

describe('App', () => {
  it('should return the initial state', () => {
    expect(reducers.app(undefined, {}))
      .toEqual(appState);
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
