import React from 'react';
import { init } from 'index';

jest.mock('redux-persist/lib/integration/react', () => ({
  PersistGate: () => (<div />),
}));

describe('index/init', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'production';
  });

  afterAll(() => {
    process.env.NODE_ENV = 'test';
  });

  it('should initiate the app', () => {
    init.run().then(environment => {
      expect(environment).toBe('production');
    });
  });
});
