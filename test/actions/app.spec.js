import { goTo, hideAlert, showAlert } from 'actions/app';

describe('App', () => {
  it('goTo should create an action to navigate with react-router', () => {
    expect([goTo('/destination')]).toMatchSnapshot();
  });

  it('showAlert should return an action', () => {
    expect(showAlert('Alright!', { id: 'test' })).toMatchSnapshot();
  });

  it('hideAlert should return an action', () => {
    expect(hideAlert('test')).toMatchSnapshot();
  });
});
