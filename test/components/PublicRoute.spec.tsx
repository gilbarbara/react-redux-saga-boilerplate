import React from 'react';
import { render } from 'test-utils';

import PublicRoute from '~/components/PublicRoute';

describe('PublicRoute', () => {
  it('should render the Login component for unauthenticated access', () => {
    const { container } = render(
      <PublicRoute isAuthenticated={false}>
        <div>LOGIN</div>
      </PublicRoute>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should redirect to /private for authenticated access', () => {
    const { container } = render(
      <PublicRoute isAuthenticated>
        <div>LOGIN</div>
      </PublicRoute>,
    );

    expect(container).toMatchSnapshot();
  });
});
