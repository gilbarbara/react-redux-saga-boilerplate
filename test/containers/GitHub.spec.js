import React from 'react';
import { shallow } from 'enzyme';

import { GitHub } from 'containers/GitHub';

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
    expect(wrapper.find('.app__github__selector')).toExist();
  });

  it('should render a Loader without data', () => {
    expect(wrapper.find('Loader')).toExist();
  });

  it('should have dispatched an action on mount', () => {
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      payload: { query: 'react' },
      type: 'GITHUB_GET_REPOS',
    });
  });

  it('should render some items when data arrives', () => {
    wrapper.setProps({
      github: {
        repos: {
          data: [
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

  it('should dispatch an action when click selector button', () => {
    const button = wrapper.find('.btn-group').childAt(1);

    button.simulate('click', {
      currentTarget: {
        dataset: { query: button.getElement().props['data-query'] },
      },
    });

    expect(mockDispatch.mock.calls[1][0]).toEqual({
      payload: { query: 'redux' },
      type: 'SWITCH_MENU',
    });
  });
});
