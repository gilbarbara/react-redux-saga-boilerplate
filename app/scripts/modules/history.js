import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';

const history = useRouterHistory(createHistory)({
  basename: __TARGET__ === 'pages' ? '/react-redux-saga-boilerplate' : '/'
});

export default history;
