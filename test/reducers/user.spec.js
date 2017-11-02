import reducers from 'reducers';
import { ActionTypes } from 'constants/index';

describe('User', () => {
  it('should return the initial state', () => {
    expect(reducers.user(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.USER_LOGIN_SUCCESS}`, () => {
    expect(reducers.user(undefined, { type: ActionTypes.USER_LOGIN_SUCCESS })).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.USER_LOGOUT_SUCCESS}`, () => {
    expect(reducers.user(undefined, { type: ActionTypes.USER_LOGOUT_SUCCESS })).toMatchSnapshot();
  });
});
