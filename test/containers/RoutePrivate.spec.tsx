import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import RoutePrivate from 'containers/RoutePrivate';

import { render } from 'test-utils';

describe('RoutePrivate', () => {
  it('should redirect for unauthenticated access', () => {
    const { container } = render(
      <Router initialEntries={['/private']}>
        <RoutePrivate
          exact
          path="/private"
          component={() => <div>PRIVATE</div>}
          isAuthenticated={false}
        />
      </Router>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should allow navigation for authenticated access', () => {
    const { container } = render(
      <Router initialEntries={['/private']}>
        <RoutePrivate
          exact
          path="/private"
          component={() => <div>PRIVATE</div>}
          isAuthenticated={true}
        />
      </Router>,
    );

    expect(container).toMatchSnapshot();
  });
});
