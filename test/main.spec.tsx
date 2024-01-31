import React from 'react';
import { act } from 'test-utils';

vi.mock('redux-persist/lib/integration/react', () => ({
  PersistGate({ children }) {
    return <div>{children}</div>;
  },
}));

vi.mock('react-helmet-async', () => ({
  HelmetProvider({ children }) {
    return children;
  },
  Helmet() {
    return null;
  },
}));

vi.mock('~/Root', () => ({ default: () => <div>root</div> }));

describe('main', () => {
  beforeAll(() => {
    const root = document.createElement('div');

    root.id = 'root';
    document.body.appendChild(root);
  });

  afterAll(() => {
    document.getElementById('root')?.remove();
  });

  it('should have mounted the app', async () => {
    await act(async () => {
      await vi.importActual('~/main');
    });

    expect(document.getElementById('root')?.innerHTML).toMatchSnapshot();
  });
});
