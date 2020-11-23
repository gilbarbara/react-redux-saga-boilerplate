import { Dispatch } from 'redux';
import { Variants } from 'styled-minimal/lib/types';
import { ValueOf } from 'type-fest';

import { AlertPosition, Icons, Status } from './common';

export interface AlertData {
  icon: Icons;
  id: string;
  message: string;
  position: AlertPosition;
  timeout: number;
  variant: Variants;
}

export interface Topic {
  cached: boolean;
  data: Array<Record<string, any>>;
  message: string;
  status: ValueOf<Status>;
  updatedAt: number;
}

export interface AppState {
  alerts: AlertData[];
}

export interface GitHubState {
  topics: Record<string, Topic>;
  query: string;
}

export interface UserState {
  isAuthenticated: boolean;
  status: ValueOf<Status>;
}

export interface StoreState {
  app: AppState;
  github: GitHubState;
  user: UserState;
}

export interface WithDispatch {
  dispatch: Dispatch;
}
