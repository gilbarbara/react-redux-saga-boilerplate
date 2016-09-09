import React from 'react';
import { shallow } from 'enzyme';

import AppPublic from 'containers/AppPublic';
import SystemNotifications from 'components/SystemNotifications';

function setup() {
  const props = {
    children: [<div key="1" className="child">Hello</div>, <div key="2" className="child">World</div>]
  };

  return shallow(<AppPublic {...props} />);
}

describe('AppPublic', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.find('.app--public').length).toBe(1);
    expect(wrapper.find('.app__main').length).toBe(1);
  });

  it('should render children', () => {
    expect(wrapper.find('.child').length).toBe(2);
  });

  it('should have <SystemNotifications />', () => {
    expect(wrapper.find(SystemNotifications).length).toBe(1);
  });
});
