import React from 'react';
import { shallow } from 'enzyme';

import { AppPrivate } from 'containers/AppPrivate';
import SystemNotifications from 'components/SystemNotifications';

function setup() {
  const props = {
    dispatch: () => {},
    children: [<div key="1" className="child">Hello</div>, <div key="2" className="child">World</div>],
    location: {},
    user: {}
  };

  return shallow(<AppPrivate {...props} />);
}

describe('AppPrivate', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.find('.app--private').length).toBe(1);
    expect(wrapper.find('.app__main').length).toBe(1);
  });

  it('should render children', () => {
    expect(wrapper.find('.child').length).toBe(2);
  });

  it('should have <SystemNotifications />', () => {
    expect(wrapper.find(SystemNotifications).length).toBe(1);
  });
});
