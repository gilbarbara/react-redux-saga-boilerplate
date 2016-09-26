import React from 'react';
import { mount } from 'enzyme';

import Logged from 'containers/Logged';

function setup() {
  const props = {
    dispatch: () => {},
    location: {}
  };

  return mount(<Logged {...props} />);
}

describe('Logged', () => {
  const wrapper = setup(true);

  it('should be a StatelessComponent', () => {
    expect(wrapper.instance().constructor.name).toBe('StatelessComponent');
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
