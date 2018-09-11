import { store, persistor } from 'app-store';

describe('store', () => {
  it('should have a store', () => {
    expect(store.getState()).toEqual({
      _persist: { rehydrated: true, version: -1 },
      app: {
        alerts: [],
      },
      github: {
        users: {
          data: {},
          status: 'idle',
          message: '',
        },
        user: {
          data: {},
          repos: [],
          status: 'idle',
          message: '',
        },
      },
      router: {
        action: 'POP',
        location: {
          hash: '',
          pathname: '/',
          query: {},
          search: '',
          state: {},
        },
      },
      user: {
        isAuthenticated: false,
        status: 'idle',
      },
    });
  });

  it('should have a persistor', () => {
    expect(persistor.getState()).toEqual({
      bootstrapped: true,
      registry: [],
    });
  });
});
