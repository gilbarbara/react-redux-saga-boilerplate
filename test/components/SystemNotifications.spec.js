import React from 'react';
import { mount } from 'enzyme';

import { appState } from 'reducers/app';
import { SystemNotifications } from 'components/SystemNotifications';

const mockDispatch = jest.fn();

function setup(app = appState) {
  const props = {
    app,
    dispatch: mockDispatch
  };

  return mount(<SystemNotifications {...props} />);
}

describe('SystemNotifications', () => {
  const wrapper = setup();

  it('should be a StatelessComponent', () => {
    expect(wrapper.instance().constructor.name).toBe('StatelessComponent');
  });

  it('should render properly with the default state', () => {
    expect(wrapper.find('.app__notifications > div').text()).toBe('');
  });

  it('should render properly with a success message', () => {
    wrapper.setProps({
      app: {
        notifications: {
          status: 'success',
          message: 'Hello',
          visible: true,
          withTimeout: true
        }
      }
    });

    const body = wrapper.find('.app__notifications');
    const icon = wrapper.find('i');
    const message = wrapper.find('.app__notifications > div');

    expect(body.hasClass('success') && body.hasClass('active')).toBe(true);
    expect(icon.hasClass('i-thumbs-up')).toBe(true);
    expect(message.text()).toBe('Hello');
  });

  it('should render properly with an error message', () => {
    wrapper.setProps({
      app: {
        notifications: {
          status: 'error',
          message: 'Fail',
          visible: true,
          withTimeout: false
        }
      }
    });

    const body = wrapper.find('.app__notifications');
    const icon = wrapper.find('i');
    const message = wrapper.find('.app__notifications > div');

    expect(body.hasClass('error') && body.hasClass('active')).toBe(true);
    expect(icon.hasClass('i-thumbs-down')).toBe(true);
    expect(message.text()).toBe('Fail');
  });

  it('should handle clicks', () => {
    const body = wrapper.find('.app__notifications');

    body.simulate('click');
    expect(mockDispatch.mock.calls[0][0]).toEqual({ type: 'HIDE_ALERT' });

    wrapper.setProps({
      app: {
        notifications: {
          status: 'error',
          message: 'Fail',
          visible: false,
          withTimeout: false
        }
      }
    });
    expect(body.hasClass('active')).toBe(false);
  });
});
