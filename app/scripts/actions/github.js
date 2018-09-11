// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const {
  githubGetRepos: getRepos,
  githubGetUsers: getUsers,
  githubGetUser: getUser,
} = createActions({
  [ActionTypes.GITHUB_GET_REPOS]: (query: string) => ({ query }),
  [ActionTypes.GITHUB_GET_USERS]: (query: string) => ({ query }),
  [ActionTypes.GITHUB_GET_USER]: (user: string) => ({ user }),
});
