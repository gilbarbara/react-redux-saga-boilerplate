import reducer from 'reducers/app';
import * as Actions from 'actions';
import { ActionTypes } from 'constants/index';

describe('App', () => {
  let app = reducer.app(undefined, {});

  it('should return the initial state', () => {
    expect(reducer.app(app, {})).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.SHOW_ALERT}`, () => {
    app = reducer.app(app, Actions.showAlert('HELLO', { id: 'test', type: 'success' }));
    expect(app).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.HIDE_ALERT}`, () => {
    app = reducer.app(app, Actions.hideAlert('test'));
    expect(app).toMatchSnapshot();
  });
});
