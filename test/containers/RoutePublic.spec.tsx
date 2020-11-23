import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import RoutePublic from 'containers/RoutePublic';

import { render } from 'test-utils';

describe('RoutePublic', () => {
  it('should render the Login component for unauthenticated access', () => {
    const { container } = render(
      <Router initialEntries={['/login']}>
        <RoutePublic
          exact
          path="/login"
          component={() => <div>LOGIN</div>}
          isAuthenticated={false}
        />
      </Router>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should redirect to /private for authenticated access', () => {
    const { container } = render(
      <Router initialEntries={['/login']}>
        <RoutePublic
          exact
          path="/login"
          component={() => <div>LOGIN</div>}
          isAuthenticated={true}
        />
      </Router>,
    );

    expect(container).toMatchSnapshot();
  });
});
