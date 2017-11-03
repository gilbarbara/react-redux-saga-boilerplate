// @flow
import createHistory from 'history/createBrowserHistory';
import qs from 'qs';

let basename = '/';
/* istanbul ignore next */
if (process.env.APP_ENV === 'pages') {
  basename = '/react-redux-saga-boilerplate/';
}

const history = createHistory({ basename });

history.location = {
  ...history.location,
  query: qs.parse(history.location.search.substr(1)),
  state: { modal: false, scroll: false },
};

/* istanbul ignore next */
history.listen(() => {
  history.location = {
    ...history.location,
    query: qs.parse(history.location.search.substr(1)),
    state: history.location.state || {},
  };
});

export default history;
