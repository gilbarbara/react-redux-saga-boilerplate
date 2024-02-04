import { emptyAction } from 'test-utils';

import { alertHide, alertShow } from '~/actions';

import reducer from '~/store/slices/alerts';

describe('slices/alerts', () => {
  describe('actions', () => {
    describe(`${alertShow.type}`, () => {
      it('should return an action with variant `error`', () => {
        expect(alertShow('Alright!', { id: 'test', type: 'error' })).toMatchSnapshot();
      });

      it('should return an action with variant `success`', () => {
        expect(
          alertShow('Alright!', { id: 'test', type: 'success', timeout: 10 }),
        ).toMatchSnapshot();
      });
    });

    describe(`${alertHide.type}`, () => {
      it('should return an action', () => {
        expect(alertHide('test')).toMatchSnapshot();
      });
    });
  });

  describe('reducer', () => {
    let alerts = reducer(undefined, emptyAction);

    it('should return the initial state', () => {
      expect(reducer(alerts, emptyAction)).toMatchSnapshot();
    });

    it(`should handle "${alertShow.type}"`, () => {
      alerts = reducer(alerts, alertShow('HELLO', { id: 'test', type: 'success' }));
      expect(alerts).toMatchSnapshot();
    });

    it(`should handle "${alertHide.type}"`, () => {
      alerts = reducer(alerts, alertHide('test'));
      expect(alerts).toMatchSnapshot();
    });
  });
});
