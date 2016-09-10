import { REHYDRATE } from 'redux-persist/constants';

import reducers from 'reducers';
import { ActionTypes } from 'constants/index';

describe('User', () => {
  it('should return the initial state', () => {
    expect(reducers.user(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${REHYDRATE} with payload`, () => {
    expect(reducers.user(undefined, { type: REHYDRATE, payload: { user: { logged: true } } })).toMatchSnapshot();
  });

  it(`should handle ${REHYDRATE} without payload`, () => {
    expect(reducers.user(undefined, { type: REHYDRATE, payload: { } })).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.USER_LOGIN_SUCCESS}`, () => {
    expect(reducers.user(undefined, { type: ActionTypes.USER_LOGIN_SUCCESS })).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.USER_LOGOUT_SUCCESS}`, () => {
    expect(reducers.user(undefined, { type: ActionTypes.USER_LOGOUT_SUCCESS })).toMatchSnapshot();
  });
});
