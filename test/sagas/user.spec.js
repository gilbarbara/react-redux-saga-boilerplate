import user from 'sagas/user';
import { ActionTypes } from 'constants/index';

function getSaga(sagas, action) {
  const saga = sagas
    .filter(d => d.FORK.args[0] === action)
    .map(d => d.FORK.args[1])
    .reduce((acc, d) => d);

  return saga();
}

describe('user', () => {
  let rootSaga;
  let watchers;

  beforeAll(() => {
    rootSaga = user();
    watchers = rootSaga.next().value.ALL;
  });

  it('should have the expected watchers', () => {
    expect(watchers).toHaveLength(2);
    expect(watchers).toMatchSnapshot();
    expect(rootSaga.next().done).toBe(true);
  });

  it('should match the login saga', () => {
    const login = getSaga(watchers, ActionTypes.USER_LOGIN_REQUEST);

    expect(login.next().value.CALL.args).toEqual([400]);
    expect(login.next().value.PUT.action.type).toBe(ActionTypes.USER_LOGIN_SUCCESS);
    expect(login.next().done).toBe(true);
  });

  it('should match the logout saga', () => {
    const logout = getSaga(watchers, ActionTypes.USER_LOGOUT_REQUEST);

    expect(logout.next().value.CALL.args).toEqual([200]);
    expect(logout.next().value.PUT.action.type).toBe(ActionTypes.USER_LOGOUT_SUCCESS);
    expect(logout.next().done).toBe(true);
  });
});
