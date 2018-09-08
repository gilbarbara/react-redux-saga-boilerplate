import React from 'react';
import { shallow } from 'enzyme';

import Private from 'routes/Private';

function setup() {
  const props = {
    dispatch: () => {},
    location: {},
  };

  return shallow(<Private {...props} />);
}

describe('Private', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.find('.app__private')).toExist();
    expect(wrapper.find('Connect(GitHub)')).toExist();
  });
});
