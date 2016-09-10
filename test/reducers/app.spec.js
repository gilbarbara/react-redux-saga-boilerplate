import { REHYDRATE } from 'redux-persist/constants';

import reducers from 'reducers';
import * as Actions from 'actions';
import { ActionTypes } from 'constants/index';

describe('App', () => {
  it('should return the initial state', () => {
    expect(reducers.app(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${REHYDRATE} with payload`, () => {
    expect(reducers.app(undefined, { type: REHYDRATE, payload: { app: [] } })).toMatchSnapshot();
  });

  it(`should handle ${REHYDRATE} without payload`, () => {
    expect(reducers.app(undefined, { type: REHYDRATE, payload: { } })).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.SHOW_ALERT}`, () => {
    expect(reducers.app(undefined, Actions.showAlert('success', 'hello')).notifications).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.HIDE_ALERT}`, () => {
    expect(reducers.app(undefined, Actions.hideAlert()).notifications).toMatchSnapshot();
  });
});
