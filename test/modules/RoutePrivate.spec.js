import React from 'react';
import Router from 'react-router-dom/MemoryRouter';
import { renderToString } from 'react-dom/server';
import RoutePrivate from 'components/RoutePrivate';

describe('modules/RoutePrivate', () => {
  it('should redirect for unauthenticated access', () => {
    const render = renderToString(
      <Router initialEntries={['/private']}>
        <RoutePrivate
          exact
          path="/private"
          component={() => <div>PRIVATE</div>}
          isAuthenticated={false}
        />
      </Router>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should allow navigation for authenticated access', () => {
    const render = renderToString(
      <Router initialEntries={['/private']}>
        <RoutePrivate
          exact
          path="/private"
          component={() => <div>PRIVATE</div>}
          isAuthenticated={true}
        />
      </Router>,
    );

    expect(render).toMatchSnapshot();
  });
});
