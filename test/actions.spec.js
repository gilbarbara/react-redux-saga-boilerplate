import expect from 'expect';

import * as Actions from 'actions/index';
import { ActionTypes } from 'constants/index';

describe('Actions', () => {
  describe('goTo', () => {
    it('should create an action to navigate with react-router > UPDATE_PATH', () => {
      expect([Actions.goTo('/destination')])
        .toInclude('/destination', (a, b) => a.payload.args[0].pathname === b);
    });
  });

  describe('showAlert', () => {
    it('should create an action to display an alert', () => {
      const expectedAction = {
        type: ActionTypes.SHOW_ALERT,
        status: 'success',
        message: 'Alright!',
        withTimeout: false
      };

      expect(Actions.showAlert('success', 'Alright!', false)).toEqual(expectedAction);
    });
  });

  describe('hideAlert', () => {
    it('should create an action to hide an alert', () => {
      const expectedAction = {
        type: ActionTypes.HIDE_ALERT
      };

      expect(Actions.hideAlert()).toEqual(expectedAction);
    });
  });
});
