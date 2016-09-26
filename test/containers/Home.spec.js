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
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should handle clicks', () => {
    wrapper.find('.btn').simulate('click');
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: 'USER_LOGIN_REQUEST' });
  });
});
