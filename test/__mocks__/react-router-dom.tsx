import React from 'react';
import { matchPath, MemoryRouter, Route, Router, Switch } from 'react-router-dom/index';

import { navigate } from 'test-utils';

export { matchPath, MemoryRouter, Route, Router, Switch };

export function Link(props) {
  const { children, className, onClick, style, to, ...rest } = props;

  delete rest.exact;

  return (
    <a
      className={className}
      href={to.pathname || to}
      onClick={e => {
        e.preventDefault();
        const [pathname, search] = (e.currentTarget.getAttribute('href') || '').split('?');

        navigate({ pathname, search });

        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}
      style={style}
      {...rest}
    >
      {children}
    </a>
  );
}

export function NavLink(props) {
  const {
    activeClassName,
    activeStyle,
    className,
    isActive: getIsActive,
    style,
    to,
    ...rest
  } = props;
  let match;

  if ((to.pathname || to) === window.location.pathname) {
    match = { path: window.location.pathname };
  }

  const isActive = typeof getIsActive === 'function' ? getIsActive(match, window.location) : null;

  return (
    <Link
      className={isActive ? [activeClassName, className].join(' ') : className}
      style={isActive ? { ...style, ...activeStyle } : style}
      to={to}
      {...rest}
    />
  );
}

export function Redirect() {
  return <div>REDIRECT</div>;
}
