import React from 'react';

export interface ActionCreator<P extends any[] = any[], A = any> {
  (...args: P): StoreAction<A>;
}

export interface ActionsMapReducer<State> {
  [type: string]: (draft: State, action: StoreAction) => any;
}

export type AlertPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface AsyncFlow {
  message: string;
  status: Status;
}

export type GenericFunction<T = any> = (...args: any[]) => T;

export type Icons =
  | 'bell-o'
  | 'bell'
  | 'bolt'
  | 'check-circle-o'
  | 'check-circle'
  | 'check'
  | 'dot-circle-o'
  | 'exclamation-circle'
  | 'question-circle-o'
  | 'question-circle'
  | 'sign-in'
  | 'sign-out'
  | 'times-circle-o'
  | 'times-circle'
  | 'times';

export interface LoggerOptions {
  collapsed?: boolean;
  hideTimestamp?: boolean;
  skip?: boolean;
  typeColor?: string;
}

export type PlainObject<T = any> = Record<string, T>;

export interface RouteProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  isAuthenticated: boolean;
  path: string;
  to?: string;
}

export interface SortFunction {
  (left: PlainObject, right: PlainObject): number;
  (left: string, right: string): number;
}

export interface Status {
  ERROR: 'error';
  IDLE: 'idle';
  READY: 'ready';
  RUNNING: 'running';
  SUCCESS: 'success';
}

export interface StoreAction<T = any> {
  type: string;
  payload?: T;
  meta?: PlainObject;
  error?: boolean;
}

export interface ShowAlertOptions {
  icon?: Icons;
  id?: string;
  position?: AlertPosition;
  timeout?: number;
  variant?: string;
}

export type Transitions = 'fade' | 'slideDown' | 'slideLeft' | 'slideRight' | 'slideUp';
