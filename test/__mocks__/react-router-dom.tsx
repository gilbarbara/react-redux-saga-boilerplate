import React from 'react';
import { matchPath, MemoryRouter, Route, Router, Switch } from 'react-router-dom/index';

import { navigate } from 'test-utils';

export { matchPath, MemoryRouter, Route, Router, Switch };

export function Link(props) {
  const { to, children, onClick, style, className, ...rest } = props;
  delete rest.exact;

  return (
    <a
      href={to.pathname || to}
      className={className}
      style={style}
      onClick={e => {
        e.preventDefault();
        const [pathname, search] = (e.currentTarget.getAttribute('href') || '').split('?');

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
}

export function NavLink(props) {
  const {
    to,
    style,
    activeStyle,
    className,
    activeClassName,
    isActive: getIsActive,
    ...rest
  } = props;
  let match;

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
}

export function Redirect() {
  return <div>REDIRECT</div>;
}
