// eslint-disable-next-line import/no-self-import
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.location = {
  ...history.location,
  state: {},
};

/* istanbul ignore next */
history.listen(() => {
  history.location = {
    ...history.location,
    state: history.location.state || {},
  };
});

const { go, goBack, push, replace } = history;

export { go, goBack, push, replace };
export default history;
