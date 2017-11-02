import React from 'react';
import { mount } from 'enzyme';

import Loader from 'components/Loader';

const mockDispatch = jest.fn();

function setup() {
  const props = {
    app: {},
    dispatch: mockDispatch,
  };

  return mount(<Loader {...props} />);
}

describe('Loader', () => {
  const wrapper = setup();

  it('should be a StatelessComponent', () => {
    expect(wrapper.instance()).toBeNull();
  });

  it('should render properly with pulse type', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render properly with rotate type', () => {
    wrapper.setProps({
      pulse: false,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
