import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Home from 'containers/Home';

function setup() {
  const props = {
    dispatch: () => {},
    location: {},
    user: {},
    spotify: {
      seedsGenres: {}
    }
  };
  const renderer = TestUtils.createRenderer();
  renderer.render(<Home {...props} />);
  const output = renderer.getRenderOutput();

  return {
    output,
    renderer
  };
}

describe('Home', () => {
  it('should render properly', () => {
    const { output } = setup(true);
    expect(output.props.className).toBe('app__home app__route');

    const Connect = output.props.children;
    expect(typeof Connect).toBe('object');
  });
});
