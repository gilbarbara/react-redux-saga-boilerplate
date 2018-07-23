import React from 'react';
import { mount } from 'enzyme';

import Alert from 'components/Alert';

function setup(children = 'Hello World', type = '') {
  return mount(<Alert type={type}>{children}</Alert>);
}

describe('Alert', () => {
  let wrapper = setup();

  it('should be a StatelessComponent', () => {
    expect(wrapper.instance()).toBeNull();
  });

  it('should render properly', () => {
    expect(wrapper.find('.app__alert')).toExist();
    expect(wrapper.find('.app__alert__icon')).toExist();
    expect(wrapper.find('.app__alert__content')).toExist();
  });

  it('should render a default alert', () => {
    expect(wrapper.find('.app__alert__content')).toHaveText('Hello World');
  });

  it('should render a success alert', () => {
    wrapper = setup('This is a success message', 'success');

    expect(wrapper.find('.app__alert__content')).toHaveText('This is a success message');
    expect(wrapper.find('.app__alert')).toHaveClassName('is-success');
  });

  it('should render a error alert with markup', () => {
    wrapper = setup(<p>This is a success message</p>, 'error');

    expect(wrapper.find('.app__alert__content p')).toExist();
    expect(wrapper.find('.app__alert')).toHaveClassName('is-error');
  });

  it('should render a warning alert', () => {
    wrapper = setup('This is a warning message', 'warning');

    expect(wrapper.find('.app__alert__content')).toHaveText('This is a warning message');
    expect(wrapper.find('.app__alert')).toHaveClassName('is-warning');
  });

  it('should render a info alert', () => {
    wrapper = setup('This is a info message', 'info');

    expect(wrapper.find('.app__alert__content')).toHaveText('This is a info message');
    expect(wrapper.find('.app__alert')).toHaveClassName('is-info');
  });

  it('should render a black alert with markup', () => {
    wrapper = setup(<div>This is a black message</div>, 'black');

    expect(wrapper.find('.app__alert__content div').length).toBe(2);
    expect(wrapper.find('.app__alert')).toHaveClassName('is-black');
  });
});
