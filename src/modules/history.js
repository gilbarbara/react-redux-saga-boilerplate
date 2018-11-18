// @flow
import createHistory from 'history/createBrowserHistory';
import qs from 'qs';

const history = createHistory();

history.location = {
  ...history.location,
  query: qs.parse(history.location.search.substr(1)),
  state: {},
};

/* istanbul ignore next */
history.listen(() => {
  history.location = {
    ...history.location,
    query: qs.parse(history.location.search.substr(1)),
    state: history.location.state || {},
  };
});

const { go, goBack, push, replace } = history;

export { go, goBack, push, replace };
export default history;
