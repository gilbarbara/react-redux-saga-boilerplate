import { login, logOut } from 'actions/user';

describe('App', () => {
  it('login should return an action', () => {
    expect(login()).toMatchSnapshot();
  });

  it('logOut should return an action', () => {
    expect(logOut()).toMatchSnapshot();
  });
});
