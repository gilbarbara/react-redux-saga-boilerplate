import React from 'react';

import { store } from 'store';
import { hideAlert, showAlert } from 'actions';
import SystemAlerts from 'containers/SystemAlerts';

jest.mock('components/Transition', () => ({ children }) => (
  <div className="transition">{children}</div>
));

jest.useFakeTimers();

const mockDispatch = setMockDispatch();

function setup() {
  return mountWithContext(
    <SystemAlerts />,
    { attachTo: document.getElementById('react') },
    { mockDispatch },
  );
}

describe('SystemAlerts', () => {
  const wrapper = setup();

  it('should render all zones', () => {
    expect(wrapper.find('Alert')).not.toExist();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render `top-left` alerts with the default timeout', () => {
    store.dispatch(
      showAlert('Hello World', {
        id: 'ABD11',
        position: 'top-left',
        variant: 'success',
      }),
    );
    wrapper.update();

    expect(wrapper.find('TopLeft Alert')).toHaveLength(1);
  });

  it('should hide the `top-left` alert after the timeout runs', () => {
    jest.runOnlyPendingTimers();
    wrapper.update();

    expect(mockDispatch).toHaveBeenCalledWith(
      {
        type: 'HIDE_ALERT',
        payload: { id: 'ABD11' },
      },
      expect.any(Function),
    );
    expect(wrapper.find('TopLeft Alert')).not.toExist();
  });

  it('should render `bottom-right` alerts without timeout', () => {
    store.dispatch(
      showAlert('Hello Mars', {
        id: 'ABD13',
        position: 'bottom-right',
        variant: 'dark',
        timeout: 0,
      }),
    );
    wrapper.update();

    expect(wrapper.find('BottomRight Alert')).toHaveLength(1);
  });

  it('should hide the `bottom-right` alert after the timeout runs', () => {
    jest.runOnlyPendingTimers();
    store.dispatch(hideAlert('ABD13'));
    wrapper.update();

    expect(wrapper.find('BottomRight Alert')).not.toExist();
  });

  it('should render `bottom-left` alerts without timeout', () => {
    store.dispatch(
      showAlert('Hello Jupiter', {
        id: 'ABD15',
        position: 'bottom-left',
        variant: 'dark',
        timeout: 0,
      }),
    );
    wrapper.update();

    expect(wrapper.find('BottomLeft Alert')).toHaveLength(1);
  });

  it('should handle the `bottom-left` alert to close whne clicking', () => {
    wrapper.find('AlertButton').simulate('click');
    wrapper.update();

    expect(mockDispatch).toHaveBeenCalledWith(
      {
        type: 'HIDE_ALERT',
        payload: { id: 'ABD15' },
      },
      expect.any(Function),
    );

    expect(wrapper.find('BottomLeft Alert')).not.toExist();
  });
});
