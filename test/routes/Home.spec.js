import React from 'react';

import { Home } from 'routes/Home';

const mockDispatch = jest.fn();
const props = {
  dispatch: mockDispatch,
  location: {},
  user: {},
};

function setup(ownProps = props) {
  return mount(<Home {...ownProps} />);
}

describe('Home', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle clicks', () => {
    wrapper.find('Button').simulate('click');

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'USER_LOGIN',
      payload: {},
    });
  });
});
