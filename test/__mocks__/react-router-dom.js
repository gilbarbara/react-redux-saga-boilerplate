import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { matchPath, MemoryRouter, Route, Router, Switch } from 'react-router-dom/index';

export { matchPath, MemoryRouter, Route, Router, Switch };

export const Link = props => {
  const { to, children, onClick, style, className, ...rest } = props;
  delete rest.exact;

  return (
    <a
      href={to.pathname || to}
      className={className}
      style={style}
      onClick={e => {
        e.preventDefault();
        const [pathname, search] = e.currentTarget.getAttribute('href').split('?');

        navigate({ pathname, search });

        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
};

export const NavLink = props => {
  const {
    to,
    style,
    activeStyle,
    className,
    activeClassName,
    isActive: getIsActive,
    ...rest
  } = props;
  let match = null;

  if ((to.pathname || to) === window.location.pathname) {
    match = { path: window.location.pathname };
  }

  const isActive = typeof getIsActive === 'function' ? getIsActive(match, window.location) : null;

  return (
    <Link
      to={to}
      className={isActive ? [activeClassName, className].join(' ') : className}
      style={isActive ? { ...style, ...activeStyle } : style}
      {...rest}
    />
  );
};

export const Redirect = () => <div>REDIRECT</div>;

function getDisplayName(Component) {
  let name = Component.displayName || Component.name || 'Component';

  if (name.includes('(')) {
    name = name.replace(/.*?\((.*)\)/, '$1');
  }

  return name;
}

export function withRouter(WrappedComponent) {
  class WithRouter extends React.Component {
    static displayName = `WithRouter(${getDisplayName(WrappedComponent)})`;

    static WrappedComponent = WrappedComponent;

    render() {
      return (
        <WrappedComponent
          {...this.props}
          location={{
            ...window.location,
            state: {},
          }}
          match={window.match || {}}
        />
      );
    }
  }

  return hoistNonReactStatics(WithRouter, WrappedComponent);
}
