import expect from 'expect';
import { REHYDRATE } from 'redux-persist/constants';

import reducers from 'reducers';
import { userState } from 'reducers/user';
import { ActionTypes } from 'constants/index';

describe('User', () => {
  it('should return the initial state', () => {
    expect(reducers.user(undefined, {}))
      .toEqual(userState);
  });

  it(`should handle ${REHYDRATE} with payload`, () => {
    expect(reducers.user(undefined, { type: REHYDRATE, payload: { user: [] } }))
      .toEqual({ ...userState, rehydrated: true });
  });

  it(`should handle ${REHYDRATE} without payload`, () => {
    expect(reducers.user(undefined, { type: REHYDRATE, payload: { } }))
      .toEqual(userState);
  });

  it(`should handle ${ActionTypes.USER_LOGIN_SUCCESS}`, () => {
    expect(reducers.user(undefined, { type: ActionTypes.USER_LOGIN_SUCCESS }).logged)
      .toEqual(true);
  });

  it(`should handle ${ActionTypes.USER_LOGOUT_SUCCESS}`, () => {
    expect(reducers.user(undefined, { type: ActionTypes.USER_LOGOUT_SUCCESS }).logged)
      .toEqual(false);
  });
});
