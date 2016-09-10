import * as Actions from 'actions';

describe('App', () => {
  it('goTo should create an action to navigate with react-router', () => {
    expect([Actions.goTo('/destination')]).toMatchSnapshot();
  });

  it('showAlert should return an action', () => {
    expect(Actions.showAlert('success', 'Alright!', false)).toMatchSnapshot();
  });

  it('hideAlert should return an action', () => {
    expect(Actions.hideAlert()).toMatchSnapshot();
  });

  it('login should return an action', () => {
    expect(Actions.login()).toMatchSnapshot();
  });

  it('logOut should return an action', () => {
    expect(Actions.logOut()).toMatchSnapshot();
  });
});
