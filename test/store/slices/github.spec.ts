import { getRepos, getReposFailure, getReposSuccess } from '~/actions';

import reducer from '~/store/slices/github';

describe('slices/github', () => {
  describe('actions', () => {
    it('getRepos', () => {
      expect(getRepos('react')).toMatchSnapshot();
    });
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: '', payload: {} })).toMatchSnapshot();
    });

    describe('getRepos', () => {
      it('should handle REQUEST', () => {
        expect(reducer(undefined, getRepos('react'))).toMatchSnapshot();
      });

      it('should handle SUCCESS', () => {
        const initialState = reducer(undefined, getRepos('react'));

        expect(
          reducer(initialState, {
            type: getReposSuccess.type,
            payload: {
              data: [{ name: 'one' }],
            },
            meta: {
              query: 'react',
              updatedAt: 1234567890,
            },
          }),
        ).toMatchSnapshot();
      });

      it('should handle FAILURE', () => {
        const initialState = reducer(undefined, getRepos('react'));

        expect(
          reducer(initialState, {
            type: getReposFailure.type,
            payload: {
              message: 'Something failed',
            },
            meta: {
              query: 'react',
            },
          }),
        ).toMatchSnapshot();
      });
    });
  });
});
