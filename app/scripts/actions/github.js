// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { ActionTypes } from 'constants/index';

/**
 * Get Repos
 *
 * @param {string} query
 * @returns {Object}
 */
export function getRepos(query: string): Object {
  return {
    type: ActionTypes.GITHUB_GET_REPOS_REQUEST,
    payload: { query },
  };
}
