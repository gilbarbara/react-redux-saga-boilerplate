import expect, { createSpy } from 'expect';
import React from 'react';
import { mount } from 'enzyme';

import { Home } from 'containers/Home';

const dispatch = createSpy();

function setup() {
  const props = {
    dispatch,
    location: {}
  };

  return mount(<Home {...props} />);
}

describe('Home', () => {
  const wrapper = setup(true);

  it('should be a Component', () => {
    expect(wrapper.instance()).toBeA(React.Component);
  });

  it('should render properly', () => {
    expect(wrapper.find('.app__home').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('React-Redux-Saga Boilerplate');
    expect(wrapper.find('.btn').text()).toBe('Login');
  });

  it('should handle clicks', () => {
    wrapper.find('.btn').simulate('click');
    expect(dispatch).toHaveBeenCalledWith({ type: 'USER_LOGIN_REQUEST' });
  });
});
