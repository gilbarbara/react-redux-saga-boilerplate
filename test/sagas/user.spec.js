import { login, logout } from 'sagas/user';

describe('user', () => {
  it('login saga', () => {
    const generator = login();

    expect(generator.next().value).toMatchSnapshot();
    expect(generator.next().value).toMatchSnapshot();
    expect(generator.next().value).toMatchSnapshot();
    expect(generator.next()).toMatchSnapshot();
  });

  it('logout saga', () => {
    const generator = logout();

    expect(generator.next().value).toMatchSnapshot();
    expect(generator.next().value).toMatchSnapshot();
    expect(generator.next().value).toMatchSnapshot();
    expect(generator.next()).toMatchSnapshot();
  });
});
