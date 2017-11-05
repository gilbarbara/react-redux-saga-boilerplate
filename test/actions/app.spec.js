import { goTo, hideAlert, showAlert } from 'actions/app';

describe('App', () => {
  it('goTo should return an action to navigate with react-router', () => {
    expect([goTo('/destination')]).toMatchSnapshot();
  });

  it('showAlert with type `error` should return an action', () => {
    expect(showAlert('Alright!', { id: 'test', type: 'error' })).toMatchSnapshot();
  });

  it('showAlert with type `success` should return an action', () => {
    expect(showAlert('Alright!', { id: 'test', type: 'success', timeout: 10 })).toMatchSnapshot();
  });

  it('hideAlert should return an action', () => {
    expect(hideAlert('test')).toMatchSnapshot();
  });
});
