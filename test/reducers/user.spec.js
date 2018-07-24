import reducer from 'reducers/user';
import { ActionTypes } from 'constants/index';

describe('User', () => {
  it('should return the initial state', () => {
    expect(reducer.user(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.USER_LOGIN}`, () => {
    expect(reducer.user(undefined, { type: ActionTypes.USER_LOGIN })).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.USER_LOGIN_SUCCESS}`, () => {
    expect(reducer.user(undefined, { type: ActionTypes.USER_LOGIN_SUCCESS })).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.USER_LOGOUT}`, () => {
    expect(reducer.user(undefined, { type: ActionTypes.USER_LOGOUT })).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.USER_LOGOUT_SUCCESS}`, () => {
    expect(reducer.user(undefined, { type: ActionTypes.USER_LOGOUT_SUCCESS })).toMatchSnapshot();
  });
});
