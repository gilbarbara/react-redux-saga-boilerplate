import React from 'react';
import { shallow } from 'enzyme';

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

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly for anonymous users', () => {
    expect(wrapper.find('HelmetWrapper')).toExist();
    expect(wrapper.find('ConnectedRouter')).toExist();
    expect(wrapper.find('Switch')).toExist();
    expect(wrapper.find('Footer')).toExist();
    expect(wrapper.find('SystemAlerts')).toExist();
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
