import React from 'react';
import { mount } from 'enzyme';

import { Home } from 'containers/Home';

const mockDispatch = jest.fn();

function setup() {
  const props = {
    dispatch: mockDispatch,
    location: {}
  };

  return mount(<Home {...props} />);
}

describe('Home', () => {
  const wrapper = setup(true);

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.find('.app__home').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('React-Redux-Saga Boilerplate');
    expect(wrapper.find('.btn').text()).toBe('Login');
  });

  it('should handle clicks', () => {
    wrapper.find('.btn').simulate('click');
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: 'USER_LOGIN_REQUEST' });
  });
});
