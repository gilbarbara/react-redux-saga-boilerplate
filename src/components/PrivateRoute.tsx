import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: ReactElement;
  isAuthenticated: boolean;
  to?: string;
}

export default function PrivateRoute(props: Props) {
  const { children, isAuthenticated, to = '/login' } = props;

  const { pathname = '' } = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate state={{ redirect: pathname, isAuthenticated }} to={to} />
  );
}
