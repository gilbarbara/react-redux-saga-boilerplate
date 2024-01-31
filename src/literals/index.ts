import { keyMirror } from '@gilbarbara/helpers';

import { Status } from '~/types';

export const ActionTypes = keyMirror({
  ALERTS_HIDE: undefined,
  ALERTS_SHOW: undefined,
  GITHUB_GET_REPOS_REQUEST: undefined,
  GITHUB_GET_REPOS_SUCCESS: undefined,
  GITHUB_GET_REPOS_FAILURE: undefined,
  SET_APP_OPTIONS: undefined,
  USER_LOGIN_REQUEST: undefined,
  USER_LOGIN_SUCCESS: undefined,
  USER_LOGIN_FAILURE: undefined,
  USER_LOGOUT_REQUEST: undefined,
  USER_LOGOUT_SUCCESS: undefined,
  USER_LOGOUT_FAILURE: undefined,
});

export const STATUS: Status = {
  IDLE: 'idle',
  RUNNING: 'running',
  READY: 'ready',
  SUCCESS: 'success',
  ERROR: 'error',
};
