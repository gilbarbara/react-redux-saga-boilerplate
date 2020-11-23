import app, { appState } from './app';
import github, { githubState } from './github';
import user, { userState } from './user';

export const initialState = {
  app: appState,
  github: githubState,
  user: userState,
};

export default {
  ...app,
  ...github,
  ...user,
};
