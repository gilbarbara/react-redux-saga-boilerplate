import { createAction, createReducer, hasValidCache } from 'modules/helpers';

declare const navigator: any;

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
      expect(hasValidCache(1234567890 - 60 * 11)).toBe(false);
    });

    it('should return true if not onLine', () => {
      navigator.onLine = false;
      expect(hasValidCache(1234567890)).toBe(true);
    });
  });
});
