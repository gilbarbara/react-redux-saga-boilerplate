import React from 'react';

import { STATUS } from 'constants/index';

import { GitHub } from 'components/GitHub';

jest.mock('nanoid', () => () => 'ABCDE');

const mockDispatch = jest.fn();
const props = {
  dispatch: mockDispatch,
  github: {
    repos: {
      data: [],
    },
  },
};

function setup(ownProps = props) {
  return shallow(<GitHub {...ownProps} />, { attachTo: document.getElementById('react') });
}

describe('GitHub', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a Loader without data', () => {
    expect(wrapper.find('Loader')).toExist();
  });

  it('should have dispatched an action on mount', () => {
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { query: 'react' },
      type: 'GITHUB_GET_REPOS',
    });
  });

  it("should not render if selected data doesn't exist", () => {
    wrapper.setProps({
      github: {
        repos: {
          data: {},
          status: STATUS.SUCCESS,
        },
      },
    });

    expect(wrapper.find('Grid')).not.toExist();
  });

  it('should render the Grid if data exists', () => {
    wrapper.setProps({
      github: {
        repos: {
          data: {
            react: [
              {
                id: 12,
                name: 'magic-tricks',
                html_url: 'https://github.com/username/magic-tricks',
                description: 'nothing much',
                owner: {
                  avatar_url: 'avatar_url',
                  login: 'username',
                },
              },
            ],
          },
          status: STATUS.SUCCESS,
        },
      },
    });

    expect(wrapper.find('Grid')).toMatchSnapshot();
  });

  it('should dispatch an alert', () => {
    wrapper.setProps({
      github: {
        repos: {
          data: {},
          status: STATUS.ERROR,
          message: 'Nothing found',
        },
      },
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SHOW_ALERT',
      payload: {
        id: 'ABCDE',
        icon: undefined,
        message: 'Nothing found',
        position: 'bottom-right',
        variant: 'danger',
        timeout: 0,
      },
    });
  });

  it('should dispatch an action when click selector button', () => {
    const button = mount(
      wrapper
        .find('ButtonGroup')
        .childAt(1)
        .getElement(),
    );

    button.simulate('click');

    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { query: 'redux' },
      type: 'SWITCH_MENU',
    });
  });
});
