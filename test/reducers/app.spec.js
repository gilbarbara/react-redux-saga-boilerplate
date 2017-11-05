import reducer from 'reducers/app';
import * as Actions from 'actions';
import { ActionTypes } from 'constants/index';

describe('App', () => {
  it('should return the initial state', () => {
    expect(reducer.app(undefined, {})).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.SHOW_ALERT}`, () => {
    expect(reducer.app(undefined, Actions.showAlert('success', 'hello')).notifications).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.HIDE_ALERT}`, () => {
    expect(reducer.app(undefined, Actions.hideAlert()).notifications).toMatchSnapshot();
  });
});
