import user, { watchLogin, watchLogout } from 'sagas/user';
import { ActionTypes } from 'constants/index';

describe('user', () => {
  it('should have the expected watchers', () => {
    const saga = user();
    const watchers = saga.next().value.ALL;

    expect(watchers).toHaveLength(2);
    expect(watchers).toMatchSnapshot();
    expect(saga.next().done).toBe(true);
  });

  it('should match the login saga', () => {
    const watcher = watchLogin();
    expect(watcher.next().value).toMatchSnapshot();

    const loginCall = watcher.next().value;
    expect(watcher.next().done).toBe(true);
    expect(typeof loginCall.CALL.fn).toBe('function');

    const login = loginCall.CALL.fn();
    expect(login.next().value.CALL.args).toEqual([400]);
    expect(login.next().value.PUT.action.type).toBe(ActionTypes.USER_LOGIN_SUCCESS);
    expect(login.next().value.PUT.action.type).toEqual('@@router/CALL_HISTORY_METHOD');
    expect(login.next().done).toBe(true);
  });

  it('should match the logout saga', () => {
    const watcher = watchLogout();
    expect(watcher.next().value).toMatchSnapshot();

    const logoutCall = watcher.next().value;
    expect(watcher.next().done).toBe(true);
    expect(typeof logoutCall.CALL.fn).toBe('function');

    const logout = logoutCall.CALL.fn();
    expect(logout.next().value.CALL.args).toEqual([200]);
    expect(logout.next().value.PUT.action.type).toBe(ActionTypes.USER_LOGOUT_SUCCESS);
    expect(logout.next().value.PUT.action.type).toEqual('@@router/CALL_HISTORY_METHOD');
    expect(logout.next().done).toBe(true);
  });
});
