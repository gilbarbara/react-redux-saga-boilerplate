import { emptyAction } from 'test-utils';

import { hideAlert, showAlert } from '~/actions';
import { ActionTypes } from '~/literals';
import reducer from '~/reducers/alerts';

describe('reducers/alerts', () => {
  let alerts = reducer.alerts(undefined, emptyAction);

  it('should return the initial state', () => {
    expect(reducer.alerts(alerts, emptyAction)).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.ALERTS_SHOW}`, () => {
    alerts = reducer.alerts(alerts, showAlert('HELLO', { id: 'test', type: 'success' }));
    expect(alerts).toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.ALERTS_HIDE}`, () => {
    alerts = reducer.alerts(alerts, hideAlert('test'));
    expect(alerts).toMatchSnapshot();
  });
});
