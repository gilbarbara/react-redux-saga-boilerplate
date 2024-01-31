import { ComponentProps, ComponentType } from 'react';
import { Alert, Types } from '@gilbarbara/components';

export type AlertPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type AlertType = ComponentProps<typeof Alert>['type'];

export interface AsyncFlow {
  message: string;
  status: Status;
}

export type GenericFunction<T = any> = (...arguments_: any[]) => T;

export type PlainObject<T = any> = Record<string, T>;

export interface RouteProps {
  component: ComponentType<any>;
  exact?: boolean;
  isAuthenticated: boolean;
  path: string;
  to?: string;
}

export interface Status {
  ERROR: 'error';
  IDLE: 'idle';
  READY: 'ready';
  RUNNING: 'running';
  SUCCESS: 'success';
}

export interface SetAppOOptions {
  query: string;
}

export interface ShowAlertOptions {
  icon?: Types.Icons;
  id?: string;
  position?: AlertPosition;
  timeout?: number;
  type?: AlertType;
}

export type Transitions = 'fade' | 'slideDown' | 'slideLeft' | 'slideRight' | 'slideUp';
