import { hideAlert, showAlert } from 'actions/app';
import { ActionTypes } from 'literals';
import reducer from 'reducers/app';

import { emptyAction } from 'test-utils';

describe('reducers/app', () => {
  let app = reducer.app(undefined, emptyAction);

  it('should return the initial state', () => {
    expect(reducer.app(app, emptyAction)).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.SHOW_ALERT}`, () => {
    app = reducer.app(app, showAlert('HELLO', { id: 'test', variant: 'success' }));
    expect(app).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.HIDE_ALERT}`, () => {
    app = reducer.app(app, hideAlert('test'));
    expect(app).toMatchSnapshot();
  });
});
