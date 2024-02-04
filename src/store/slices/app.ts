import { createSlice } from '@reduxjs/toolkit';

import { AppState } from '~/types';

export const appState: AppState = {
  query: 'react',
};

export const appSlice = createSlice({
  name: 'app',
  initialState: appState,
  reducers: {
    setAppOptions: (draft, { payload }) => {
      draft.query = payload.query;
    },
  },
});

export const { setAppOptions } = appSlice.actions;
export default appSlice.reducer;
