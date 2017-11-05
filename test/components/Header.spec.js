import React from 'react';
import { mount } from 'enzyme';

import Header from 'components/Header';

const mockDispatch = jest.fn();

function setup() {
  const props = {
    app: {},
    dispatch: mockDispatch,
    location: {
      pathname: '/',
    },
  };

  return mount(<Header {...props} />);
}

describe('Header', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should handle clicks', () => {
    wrapper.find('.app__logout').simulate('click');
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: 'USER_LOGOUT_REQUEST' });
  });
});

