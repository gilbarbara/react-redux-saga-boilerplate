import { parseError } from 'modules/client';
import { createReducer } from 'modules/helpers';

import { ActionTypes, STATUS } from 'literals';

import { GitHubState, Topic } from 'types';

const topic: Topic = {
  cached: false,
  data: [],
  message: '',
  status: STATUS.IDLE,
  updatedAt: 0,
};

export const githubState: GitHubState = {
  topics: {},
  query: '',
};

export default {
  github: createReducer<GitHubState>(
    {
      [ActionTypes.GITHUB_GET_REPOS_REQUEST]: (draft, { payload }) => {
        const { query } = payload;
        draft.query = query;

        draft.topics[query] = draft.topics[query] || { ...topic };

        draft.topics[query].message = '';
        draft.topics[query].status = STATUS.RUNNING;
      },
      [ActionTypes.GITHUB_GET_REPOS_SUCCESS]: (draft, { meta, payload }) => {
        const { cached, query, updatedAt } = meta || {};

        draft.topics[query] = draft.topics[query] || { ...topic };

        draft.topics[query].cached = cached;
        draft.topics[query].data = payload;
        draft.topics[query].status = STATUS.SUCCESS;
        draft.topics[query].updatedAt = updatedAt;
      },
      [ActionTypes.GITHUB_GET_REPOS_FAILURE]: (draft, { meta, payload }) => {
        const { query } = meta || {};

        draft.topics[query] = draft.topics[query] || { ...topic };

        draft.topics[query].message = parseError(payload);
        draft.topics[query].status = STATUS.ERROR;
        draft.topics[query].updatedAt = 0;
      },
    },
    githubState,
  ),
};
