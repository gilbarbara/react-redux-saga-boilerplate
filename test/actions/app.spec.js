import { hideAlert, showAlert } from 'actions/app';

describe('App', () => {
  it('showAlert with variant `error` should return an action', () => {
    expect(showAlert('Alright!', { id: 'test', variant: 'danger' })).toMatchSnapshot();
  });

  it('showAlert with variant `success` should return an action', () => {
    expect(showAlert('Alright!', { id: 'test', variant: 'success', timeout: 10 })).toMatchSnapshot();
  });

  it('hideAlert should return an action', () => {
    expect(hideAlert('test')).toMatchSnapshot();
  });
});
