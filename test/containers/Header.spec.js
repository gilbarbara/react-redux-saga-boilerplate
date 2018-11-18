import React from 'react';

import Header from 'containers/Header';

const mockDispatch = jest.fn();

function setup() {
  const props = {
    app: {},
    dispatch: mockDispatch,
    location: {
      pathname: '/',
    },
  };

  return mount(<Header {...props} />);
}

describe('Header', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle clicks', () => {
    wrapper.find('Logout').simulate('click');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'USER_LOGOUT',
      payload: {},
    });
  });
});
