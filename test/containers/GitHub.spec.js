import React from 'react';
import { shallow } from 'enzyme';

import { GitHub } from 'containers/GitHub';

const mockDispatch = jest.fn();

const props = {
  dispatch: mockDispatch,
  github: {
    users: {
      data: [],
    },
    user: {
      data: {},
    },
  },
};

function setup(ownProps = props) {
  return shallow(
    <GitHub {...ownProps} />,
    { attachTo: document.getElementById('react') }
  );
}

describe('GitHub', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly', () => {
    expect(wrapper.find('.app__github')).toExist();
    expect(wrapper.find('.app__github__search')).toExist();
  });

  it('should not render a Loader without data', () => {
    expect(wrapper.find('Loader')).not.toExist();
  });

  it('should not have dispatched an action on mount', () => {
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should render some items when data arrives', () => {
    wrapper.setProps({
      github: {
        users: {
          data: [
            {
              login: 'vallades',
              id: 1777796,
              node_id: 'MDQ6VXNlcjE3Nzc3OTY=',
              avatar_url: 'https://avatars0.githubusercontent.com/u/1777796?v=4',
              gravatar_id: '',
            },
          ],
        },
        user: {
          data: {
            login: 'vallades',
          },
          repos: [
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
      },
    });

    expect(wrapper.find('.app__github__grid')).toMatchSnapshot();
  });
});
