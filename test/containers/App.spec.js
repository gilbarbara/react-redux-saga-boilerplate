import React from 'react';

import { App } from 'containers/App';

const mockDispatch = jest.fn();

const props = {
  app: {
    alerts: [],
  },
  dispatch: mockDispatch,
  user: {
    isAuthenticated: false,
  },
};

function setup(ownProps = props) {
  return shallow(
    <App {...ownProps} />,
    { attachTo: document.getElementById('react') }
  );
}

describe('App', () => {
  const wrapper = setup();

  it('should render properly for anonymous users', () => {
    expect(wrapper.find('HelmetWrapper')).toExist();
    expect(wrapper.find('Switch')).toExist();
    expect(wrapper.find('Footer')).toExist();
    expect(wrapper.find('Connect(SystemAlerts)')).toExist();
  });

  it('should render properly for logged users', () => {
    wrapper.setProps({
      ...wrapper.props(),
      user: {
        isAuthenticated: true,
      },
    });

    expect(wrapper.find('Header')).toExist();
  });
});
