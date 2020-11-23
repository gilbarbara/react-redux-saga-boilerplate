import { advanceTo } from 'jest-date-mock';

import {
  createAction,
  createReducer,
  hasValidCache,
  keyMirror,
  logger,
  sleep,
  sortByLocaleCompare,
} from 'modules/helpers';

declare const navigator: any;

jest.useFakeTimers();

describe('modules/helpers', () => {
  describe('createAction', () => {
    it('should return an action creator without input', () => {
      const actionCreator = createAction('TEST', () => undefined);

      expect(actionCreator).toEqual(expect.any(Function));
      expect(actionCreator()).toEqual({
        type: 'TEST',
        payload: undefined,
      });
    });

    it('should return an action creator with a string', () => {
      const actionCreator = createAction('TEST', (input: string) => ({ input }));

      expect(actionCreator).toEqual(expect.any(Function));
      expect(actionCreator('hey')).toEqual({
        type: 'TEST',
        payload: { input: 'hey' },
      });
    });

    it('should return an action creator with an object', () => {
      const actionCreator = createAction('TEST', (payload: Record<string, any>) => payload);

      expect(actionCreator).toEqual(expect.any(Function));
      expect(actionCreator({ value: 10 })).toEqual({
        type: 'TEST',
        payload: { value: 10 },
      });
    });

    it('should throw if missing payload creator', () => {
      // @ts-ignore
      expect(() => createAction('TEST')).toThrow('Expected a function');
    });
  });

  describe('createReducer', () => {
    const reducer = createReducer(
      {
        TEST: draft => {
          draft.attempt++;
        },
      },
      { attempt: 0 },
    );

    it('should return a reducer function', () => {
      expect(reducer).toEqual(expect.any(Function));
    });

    it('should return properly using the default state', () => {
      expect(reducer(undefined, { type: 'TEST' })).toEqual({ attempt: 1 });
    });

    it('should return properly using a custom state', () => {
      expect(reducer({ attempt: 10 }, { type: 'TEST' })).toEqual({ attempt: 11 });
    });
  });

  describe('hasValidCache', () => {
    beforeAll(() => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true,
      });
    });

    afterAll(() => {
      navigator.onLine = true;
    });

    it('should return properly', () => {
      expect(hasValidCache(1234567890)).toBe(false);
    });

    it('should return true if not onLine', () => {
      navigator.onLine = false;
      expect(hasValidCache(1234567890)).toBe(true);
    });
  });

  describe('keyMirror', () => {
    it('should return properly', () => {
      expect(keyMirror({ NAME: 'John Doe' })).toEqual({ NAME: 'NAME' });
    });

    it('should throw for bad inputs', () => {
      expect(() => keyMirror([])).toThrow('Expected an object');
      // @ts-ignore
      expect(() => keyMirror('a')).toThrow('Expected an object');
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

  describe('sleep', () => {
    it('should resolve', () => {
      const runner = (async () => {
        await sleep();

        return true;
      })();

      jest.advanceTimersByTime(1000);

      return runner.then(value => expect(value).toBeTrue());
    });
  });

  describe('sortByLocaleCompare', () => {
    it.each([
      ['portuguese', ['Mãe', 'limão', 'cachê', 'tião', 'amô', 'côncavo'], { descending: true }],
      ['french', ['réservé', 'Premier', 'Cliché', 'communiqué', 'café', 'Adieu']],
      ['english', ['port', 'Mars', 'Car', 'cart', 'Payment', 'asylum', 'Asian']],
    ])('should sort an array of string in %s', (_, input, options = undefined) => {
      expect(input.sort(sortByLocaleCompare(undefined, options))).toMatchSnapshot();
    });

    it.each([
      ['ascending', [{ name: 'Jim' }, { name: 'Mark' }, { name: 'Ames' }]],
      ['descending', [{ name: 'Jim' }, { name: 'Mark' }, { name: 'Ames' }], { descending: true }],
    ])('should sort an array of objects %s', (_, input, options = undefined) => {
      expect(input.sort(sortByLocaleCompare('name', options))).toMatchSnapshot();
    });
  });
});
