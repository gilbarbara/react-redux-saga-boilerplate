import { store, persistor } from 'store';

describe('store', () => {
  it('should have a store', () => {
    expect(store.getState()).toMatchSnapshot();
  });

  it('should have a persistor', () => {
    expect(persistor.getState()).toMatchSnapshot();
  });
});
