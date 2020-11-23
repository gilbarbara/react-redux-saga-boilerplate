import { hideAlert, showAlert } from 'actions/app';

describe('actions/app', () => {
  it('showAlert with variant `error`', () => {
    expect(showAlert('Alright!', { id: 'test', variant: 'danger' })).toMatchSnapshot();
  });

  it('showAlert with variant `success`', () => {
    expect(
      showAlert('Alright!', { id: 'test', variant: 'success', timeout: 10 }),
    ).toMatchSnapshot();
  });

  it('hideAlert', () => {
    expect(hideAlert('test')).toMatchSnapshot();
  });
});
