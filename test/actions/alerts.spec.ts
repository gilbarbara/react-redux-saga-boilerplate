import { hideAlert, showAlert } from '~/actions/alerts';

describe('actions/alerts', () => {
  describe('showAlert', () => {
    it('should return an action with type `error`', () => {
      expect(showAlert('Alright!', { id: 'test', type: 'error' })).toMatchSnapshot();
    });

    it('should return an action with type `success`', () => {
      expect(showAlert('Alright!', { id: 'test', type: 'success', timeout: 10 })).toMatchSnapshot();
    });
  });

  describe('hideAlert', () => {
    it('should return an action', () => {
      expect(hideAlert('test')).toMatchSnapshot();
    });
  });
});
