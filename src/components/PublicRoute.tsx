import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: ReactElement;
  isAuthenticated: boolean;
  to?: string;
}

export default function PublicRoute(props: Props) {
  const { children, isAuthenticated, to = '/' } = props;
  const { state } = useLocation();

  return isAuthenticated ? <Navigate to={state?.redirect || to} /> : children;
}
