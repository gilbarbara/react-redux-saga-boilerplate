import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { topic } from '~/config';

import { actionBody } from '~/modules/helpers';

import { STATUS } from '~/literals';

import { GitHubState } from '~/types';

interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

export const githubState: GitHubState = {
  topics: {},
};

export const githubSlice = createSlice({
  name: 'github',
  initialState: githubState,
  reducers: {
    getRepos: (draft, { payload }: PayloadAction<string>) => {
      draft.topics[payload] = draft.topics[payload] || { ...topic };

      draft.topics[payload].message = '';
      draft.topics[payload].status = STATUS.RUNNING;
    },
    getReposSuccess: {
      reducer: (
        draft,
        { meta, payload }: PayloadAction<Record<string, any>[], string, GetReposSuccessMeta>,
      ) => {
        const { cached = false, query = '', updatedAt = 0 } = meta || {};

        draft.topics[query] = draft.topics[query] || { ...topic };

        draft.topics[query].cached = cached;
        draft.topics[query].data = payload;
        draft.topics[query].status = STATUS.SUCCESS;
        draft.topics[query].updatedAt = updatedAt;
      },
      prepare: (payload: Record<string, any>[], meta: GetReposSuccessMeta) =>
        actionBody(payload, meta),
    },
    getReposFailure: {
      reducer: (draft, { meta, payload }: PayloadAction<string, string, { query: string }>) => {
        const { query = '' } = meta || {};

        draft.topics[query] = draft.topics[query] || { ...topic };

        draft.topics[query].message = payload;
        draft.topics[query].status = STATUS.ERROR;
        draft.topics[query].updatedAt = 0;
      },
      prepare: (payload: string, query: string) => actionBody(payload, { query }),
    },
  },
});

export const { getRepos, getReposFailure, getReposSuccess } = githubSlice.actions;
export default githubSlice.reducer;
