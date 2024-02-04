import { configStore, store } from '~/store';

describe('store', () => {
  it('should create a new store', () => {
    expect(configStore().getState()).toMatchSnapshot();
  });

  it('should return the global store', () => {
    expect(store.getState()).toMatchSnapshot();
  });
});
