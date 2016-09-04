import expect, { createSpy } from 'expect';
import React from 'react';
import { mount } from 'enzyme';

import NotFound from 'containers/NotFound';

const dispatch = createSpy();

function setup() {
  const props = {
    dispatch,
    location: {}
  };

  return mount(<NotFound {...props} />);
}

describe('NotFound', () => {
  const wrapper = setup(true);

  it('should be a Component', () => {
    expect(wrapper.instance()).toBeA(React.Component);
  });

  it('should render properly', () => {
    expect(wrapper.find('.app__not-found').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('404');
  });
});
