// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { githubGetRepos: getRepos } = createActions({
  [ActionTypes.GITHUB_GET_REPOS]: (query: string) => ({ query }),
});
