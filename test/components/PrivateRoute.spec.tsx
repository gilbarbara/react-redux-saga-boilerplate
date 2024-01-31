import React from 'react';
import { render } from 'test-utils';

import PrivateRoute from '~/components/PrivateRoute';

describe('PrivateRoute', () => {
  it('should redirect for unauthenticated access', () => {
    const { container } = render(
      <PrivateRoute isAuthenticated={false}>
        <div>PRIVATE</div>
      </PrivateRoute>,
      { path: '/private', pathname: '/private' },
    );

    expect(container).toMatchSnapshot();
  });

  it('should allow navigation for authenticated access', () => {
    const { container } = render(
      <PrivateRoute isAuthenticated>
        <div>PRIVATE</div>
      </PrivateRoute>,
      { path: '/private', pathname: '/private' },
    );

    expect(container).toMatchSnapshot();
  });
});
