import React from 'react';
import { ActionTypes, XHR } from 'constants/index';
import '../app/scripts/index';

jest.mock('redux-persist/lib/integration/react', () => ({
  PersistGate: () => (<div />),
}));

describe('Constants:ActionTypes', () => {
  it('should match the snapshot', () => {
    expect(ActionTypes).toMatchSnapshot();
  });
});

describe('Constants:XHR', () => {
  it('should match the snapshot', () => {
    expect(XHR).toMatchSnapshot();
  });
});
