import { advanceTo } from 'jest-date-mock';
import { datasetToObject, handleActions, keyMirror, logger, spread } from 'modules/helpers';

describe('helpers', () => {
  describe('datasetToObject', () => {
    const el = document.createElement('div');
    el.setAttribute('data-rule', 'yes');
    el.setAttribute('data-minute-maid', 'no');

    it('should convert DOMElement data to object', () => {
      expect(datasetToObject(el)).toMatchSnapshot();
    });
  });

  describe('handleActions', () => {
    it('should handle no changes', () => {
      const state = { isLogged: false };
      const reducer = handleActions(
        {
          LOGIN: draft => {
            draft.isLogged = true;
          },
        },
        state,
      );

      expect(reducer(state, { type: 'LOGOUT' })).toEqual({ isLogged: false });
    });

    it('should handle updates', () => {
      const state = { isLogged: false };
      const reducer = handleActions(
        {
          LOGIN: draft => {
            draft.isLogged = true;
          },
        },
        state,
      );

      expect(reducer(state, { type: 'LOGIN' })).toEqual({ isLogged: true });
    });

    it('should handle replace', () => {
      const state = { isLogged: false };
      const reducer = handleActions(
        {
          LOGIN: () => ({ test: true }),
        },
        state,
      );

      expect(reducer(state, { type: 'LOGIN' })).toEqual({ test: true });
    });
  });

  describe('keyMirror', () => {
    it('should return an object with mirrored keys', () => {
      expect(
        keyMirror({
          SWITCH_MENU: undefined,
          EXCEPTION: undefined,
          USER_LOGIN: undefined,
          USER_LOGIN_SUCCESS: undefined,
          USER_LOGIN_FAILURE: undefined,
          USER_LOGOUT: undefined,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('logger', () => {
    let group;
    let groupCollapsed;
    let groupEnd;
    let log;

    beforeAll(() => {
      process.env.NODE_ENV = 'development';
      /* eslint-disable prefer-destructuring */
      group = console.group;
      groupCollapsed = console.groupCollapsed;
      groupEnd = console.groupEnd;
      log = console.log;
      /* eslint-enable */

      advanceTo(new Date(2019, 1, 1, 0, 0, 0));

      console.group = jest.fn();
      console.groupCollapsed = jest.fn();
      console.groupEnd = jest.fn();
      console.log = jest.fn();
    });

    afterAll(() => {
      process.env.NODE_ENV = 'test';
      console.group = group;
      console.groupCollapsed = groupCollapsed;
      console.groupEnd = groupEnd;
      console.log = log;
    });

    it('without options', () => {
      logger('type', 'Title', { a: 1 });

      expect(console.groupCollapsed).toHaveBeenLastCalledWith(
        '%c type %cTitle %c@ 00:00:00',
        'color: gray; font-weight: lighter;',
        'color: inherit;',
        'color: gray; font-weight: lighter;',
      );
      expect(console.log).toHaveBeenLastCalledWith({ a: 1 });
      expect(console.groupEnd).toHaveBeenCalledTimes(1);
    });

    it('with typeColor option', () => {
      logger('type', 'Title', ['a'], { typeColor: '#ffc52e' });

      expect(console.groupCollapsed).toHaveBeenLastCalledWith(
        '%c type %cTitle %c@ 00:00:00',
        'color: #ffc52e; font-weight: lighter;',
        'color: inherit;',
        'color: gray; font-weight: lighter;',
      );
      expect(console.log).toHaveBeenLastCalledWith(['a']);
      expect(console.groupEnd).toHaveBeenCalledTimes(2);
    });

    it('with hideTimestamp option', () => {
      logger('type', 'Title', 'OK', { hideTimestamp: true });

      expect(console.groupCollapsed).toHaveBeenLastCalledWith(
        '%c type %cTitle',
        'color: gray; font-weight: lighter;',
        'color: inherit;',
      );
      expect(console.log).toHaveBeenLastCalledWith('OK');
      expect(console.groupEnd).toHaveBeenCalledTimes(3);
    });

    it('with collapsed option', () => {
      logger('type', 'Title', null, { collapsed: false });

      expect(console.group).toHaveBeenLastCalledWith(
        '%c type %cTitle %c@ 00:00:00',
        'color: gray; font-weight: lighter;',
        'color: inherit;',
        'color: gray; font-weight: lighter;',
      );
      expect(console.log).toHaveBeenLastCalledWith(null);
      expect(console.groupEnd).toHaveBeenCalledTimes(4);
    });
  });

  describe('spread', () => {
    it('should merge properly', () => {
      const state = { dob: 1 };

      expect(spread(state, { dob: 1 })).toBe(state);

      expect(spread(state, { dob: 2 })).not.toBe(state);
    });
  });
});
