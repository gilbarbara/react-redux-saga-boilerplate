import expect, { createSpy } from 'expect';
import React from 'react';
import { mount } from 'enzyme';

import Header from 'components/Header';

const dispatch = createSpy();

function setup() {
  const props = {
    app: {},
    dispatch,
    location: {
      pathname: '/'
    }
  };

  return mount(<Header {...props} />);
}

describe('Header', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance()).toBeA(React.Component);
  });

  it('should render properly', () => {
    expect(wrapper.find('.app__header').length).toBe(1);
    expect(wrapper.find('.app__header__logo').length).toBe(1);
  });

  it('should handle clicks', () => {
    wrapper.find('.app__header__logo').simulate('click');
    expect(dispatch).toHaveBeenCalledWith({
      type: '@@router/CALL_HISTORY_METHOD',
      payload: { method: 'push', args: [{ pathname: '/', search: undefined, state: undefined }] }
    });

    wrapper.find('.app__logout').simulate('click');
    expect(dispatch).toHaveBeenCalledWith({ type: 'USER_LOGOUT_REQUEST' });
  });
});
