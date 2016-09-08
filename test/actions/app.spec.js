import expect from 'expect';

import * as Actions from 'actions';
import { ActionTypes } from 'constants/index';

describe('App', () => {
  it('goTo should create an action to navigate with react-router > UPDATE_PATH', () => {
    expect([Actions.goTo('/destination')])
      .toInclude('/destination', (a, b) => a.payload.args[0].pathname === b);
  });

  it('showAlert should return an action', () => {
    const expectedAction = {
      type: ActionTypes.SHOW_ALERT,
      status: 'success',
      message: 'Alright!',
      withTimeout: false
    };

    expect(Actions.showAlert('success', 'Alright!', false)).toEqual(expectedAction);
  });

  it('hideAlert should return an action', () => {
    expect(Actions.hideAlert()).toEqual({ type: ActionTypes.HIDE_ALERT });
  });

  it('login should return an action', () => {
    expect(Actions.login()).toEqual({ type: ActionTypes.USER_LOGIN_REQUEST });
  });

  it('logOut should return an action', () => {
    expect(Actions.logOut()).toEqual({ type: ActionTypes.USER_LOGOUT_REQUEST });
  });
});
