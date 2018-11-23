import React from 'react';

jest.mock('redux-persist/lib/integration/react', () => ({
  PersistGate: () => <div id="persist-gate" />,
}));

describe('index/app', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'production';
  });

  afterAll(() => {
    process.env.NODE_ENV = 'test';
  });

  it('should have mounted the app', () => {
    require('index');
    expect(document.getElementById('persist-gate')).not.toBeNull();
  });
});
