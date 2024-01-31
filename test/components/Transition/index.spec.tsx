import React from 'react';
import { noop } from '@gilbarbara/helpers';
import { render } from 'test-utils';

import Transition from '~/components/Transition/index';

describe('Transition', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(noop);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should render properly', () => {
    const { container } = render(
      <Transition transition="fade">
        <div className="transition" />
      </Transition>,
    );

    expect(container).toMatchSnapshot();
  });

  it("should not render if transition don't exist", () => {
    const { container } = render(
      // @ts-ignore
      <Transition transition="rotate">
        <div className="transition" />
      </Transition>,
    );

    expect(container).toMatchSnapshot();
  });
});
