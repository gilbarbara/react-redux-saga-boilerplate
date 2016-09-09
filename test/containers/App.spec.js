import React from 'react';
import { shallow } from 'enzyme';

import App from 'containers/App';

function setup() {
  const props = {
    children: <div key="1" className="child">Hello</div>,
    location: {}
  };

  return shallow(<App {...props} />);
}

describe('App', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.find('.child').length).toBe(1);
  });
});
