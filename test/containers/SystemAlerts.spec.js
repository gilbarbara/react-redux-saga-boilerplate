import React from 'react';

import { showAlert } from 'actions';
import { SystemAlerts } from 'containers/SystemAlerts';

jest.mock('components/Transition', () => ({ children }) => (
  <div className="transition">{children}</div>
));

jest.useFakeTimers();

const mockDispatch = jest.fn();
const props = {
  app: {
    alerts: [],
  },
  dispatch: mockDispatch,
};

function setup(ownProps = props) {
  return mount(<SystemAlerts {...ownProps} />);
}

describe('SystemAlerts', () => {
  const wrapper = setup();

  it('should render all zones', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render `top-left` alerts with the default timeout', () => {
    const { payload } = showAlert('Hello World', {
      id: 'ABD11',
      position: 'top-left',
      variant: 'success',
    });
    wrapper.setProps({
      app: {
        alerts: [payload],
      },
    });

    expect(wrapper.find('TopLeft Alert')).toHaveLength(1);
  });

  it('should hide the `top-left` alert after the timeout runs', () => {
    jest.runOnlyPendingTimers();
    wrapper.setProps({
      app: {
        alerts: [],
      },
    });
    wrapper.update();

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'HIDE_ALERT',
      payload: { id: 'ABD11' },
    });
    expect(wrapper.find('TopLeft Alert')).not.toExist();
  });

  it('should render `bottom-right` alerts without timeout', () => {
    const { payload } = showAlert('Hello Mars', {
      id: 'ABD13',
      position: 'bottom-right',
      variant: 'dark',
      timeout: 0,
    });
    wrapper.setProps({
      app: {
        alerts: [payload],
      },
    });

    expect(wrapper.find('BottomRight Alert')).toHaveLength(1);
  });

  it('should hide the `bottom-right` alert after the timeout runs', () => {
    jest.runOnlyPendingTimers();
    expect(wrapper.find('BottomRight Alert')).toHaveLength(1);

    wrapper.setProps({
      app: {
        alerts: [],
      },
    });

    expect(wrapper.find('BottomRight Alert')).not.toExist();
  });

  it('should render `bottom-left` alerts without timeout', () => {
    const { payload } = showAlert('Hello Jupiter', {
      id: 'ABD15',
      position: 'bottom-left',
      variant: 'dark',
      timeout: 0,
    });
    wrapper.setProps({
      app: {
        alerts: [payload],
      },
    });

    expect(wrapper.find('BottomLeft Alert')).toHaveLength(1);
  });

  it('should handle the `bottom-left` alert to close when clicking the button', () => {
    wrapper.find('AlertButton').simulate('click');
    wrapper.setProps({
      app: {
        alerts: [],
      },
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'HIDE_ALERT',
      payload: { id: 'ABD15' },
    });

    expect(wrapper.find('BottomLeft Alert')).not.toExist();
  });
});
