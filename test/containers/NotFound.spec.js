import React from 'react';
import { mount } from 'enzyme';

import NotFound from 'containers/NotFound';

function setup() {
  return mount(<NotFound />);
}

describe('NotFound', () => {
  const wrapper = setup(true);

  it('should be a StatelessComponent', () => {
    expect(wrapper.instance().constructor.name).toBe('StatelessComponent');
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
