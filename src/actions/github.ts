/* eslint-disable import/prefer-default-export */
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createAction } from 'modules/helpers';

import { ActionTypes } from 'literals';

export const getRepos = createAction(ActionTypes.GITHUB_GET_REPOS_REQUEST, (query: string) => ({
  query,
}));
