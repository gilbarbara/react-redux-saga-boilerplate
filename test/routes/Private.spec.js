import React from 'react';
import { mount } from 'enzyme';

import Private from 'routes/Private';

function setup() {
  const props = {
    dispatch: () => {},
    location: {},
  };

  return mount(<Private {...props} />);
}

describe('Private', () => {
  const wrapper = setup();

  it('should be a StatelessComponent', () => {
    expect(wrapper.instance()).toBeNull();
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
