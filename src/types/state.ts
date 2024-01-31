import { ReactNode } from 'react';
import { Types } from '@gilbarbara/components';
import { Dispatch } from 'redux';
import { ValueOf } from 'type-fest';

import { AlertPosition, AlertType, Status } from './common';

export interface AlertData {
  icon: Types.Icons;
  id: string;
  message: ReactNode;
  position: AlertPosition;
  timeout: number;
  type: AlertType;
}

export interface Topic {
  cached: boolean;
  data: Array<Record<string, any>>;
  message: string;
  status: ValueOf<Status>;
  updatedAt: number;
}

export interface AlertsState {
  data: AlertData[];
}

export interface AppState {
  query: string;
}

export interface GitHubState {
  topics: Record<string, Topic>;
}

export interface UserState {
  isAuthenticated: boolean;
  status: ValueOf<Status>;
}

export interface RootState {
  alerts: AlertsState;
  app: AppState;
  github: GitHubState;
  user: UserState;
}

export interface WithDispatch {
  dispatch: Dispatch;
}
