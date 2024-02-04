import { emptyAction } from 'test-utils';

import { setAppOptions } from '~/actions';

import reducer from '~/store/slices/app';

describe('slices/app', () => {
  describe('actions', () => {
    describe(`${setAppOptions.type}`, () => {
      it('should return an action', () => {
        expect(setAppOptions({ query: 'react' })).toMatchSnapshot();
      });
    });
  });

  describe('reducer', () => {
    let app = reducer(undefined, emptyAction);

    it('should return the initial state', () => {
      expect(reducer(app, emptyAction)).toMatchSnapshot();
    });

    it(`should handle ${setAppOptions.type}`, () => {
      app = reducer(app, setAppOptions({ query: 'test' }));
      expect(app).toMatchSnapshot();
    });
  });
});
