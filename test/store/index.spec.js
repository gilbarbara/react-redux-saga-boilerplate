import { store, persistor } from 'app-store';

describe('store', () => {
  it('should have a store', () => {
    expect(store.getState()).toEqual({
      _persist: { rehydrated: true, version: -1 },
      app: {
        notifications: {
          message: '',
          status: '',
          visible: false,
          withTimeout: true,
        },
      },
      router: { location: null },
      user: { isAuthenticated: false },
    });
  });

  it('should have a persistor', () => {
    expect(persistor.getState()).toEqual({
      bootstrapped: true,
      registry: [],
    });
  });
});
