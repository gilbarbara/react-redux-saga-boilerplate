import { emptyAction } from 'test-utils';

import { login, loginSuccess, logOut, logOutSuccess } from '~/actions';

import reducer from '~/store/slices/user';

describe('User', () => {
  describe('actions', () => {
    it('login', () => {
      expect(login()).toMatchSnapshot();
    });

    it('logOut', () => {
      expect(logOut()).toMatchSnapshot();
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, emptyAction)).toMatchSnapshot();
    });

    describe(`${login.type}`, () => {
      it('should handle REQUEST', () => {
        expect(reducer(undefined, { type: login.type })).toMatchSnapshot();
      });

      it('should handle SUCCESS', () => {
        expect(reducer(undefined, { type: loginSuccess.type })).toMatchSnapshot();
      });
    });

    describe(`${logOut.type}`, () => {
      it('should handle REQUEST', () => {
        expect(reducer(undefined, { type: logOut.type })).toMatchSnapshot();
      });

      it('should handle SUCCESS', () => {
        expect(reducer(undefined, { type: logOutSuccess.type })).toMatchSnapshot();
      });
    });
  });
});
