import React from 'react';
import { navigate } from 'test-utils';

function Link(props: any) {
  const { children, className, onClick, style, to, ...rest } = props;

  delete rest.end;

  return (
    <a
      className={typeof className === 'function' ? undefined : className}
      href={to.pathname || to}
      onClick={event => {
        event.preventDefault();
        const [pathname, search] = (event.currentTarget.getAttribute('href') || '').split('?');

        navigate({ pathname, search });

        if (typeof onClick === 'function') {
          onClick(event);
        }
      }}
      style={style}
      {...rest}
    >
      {children}
    </a>
  );
}

function NavLink(props: any) {
  const {
    activeClassName,
    activeStyle,
    className,
    isActive: getIsActive,
    style,
    to,
    ...rest
  } = props;
  let match: Record<string, string> | null = null;

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

function Navigate({ to }: any) {
  return <div data-to={to}>NAVIGATE</div>;
}

function useParams() {
  return {};
}

function useLocation() {
  return {};
}

vi.mock('react-router-dom', async importOriginal => {
  const reactRouterDom = await importOriginal<typeof import('react-router-dom')>();

  return {
    ...reactRouterDom,
    Link,
    Navigate,
    NavLink,
    useParams,
    useLocation,
  };
});
