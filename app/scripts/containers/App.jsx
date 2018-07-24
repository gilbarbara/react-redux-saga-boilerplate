import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Helmet from 'react-helmet';
import cx from 'classnames';
import treeChanges from 'tree-changes';
import history from 'modules/history';

import config from 'config';
import { showAlert } from 'actions';

import Home from 'routes/Home';
import Private from 'routes/Private';
import NotFound from 'routes/NotFound';

import Header from 'containers/Header';
import SystemAlerts from 'containers/SystemAlerts';

import Footer from 'components/Footer';
import RoutePublic from 'components/RoutePublic';
import RoutePrivate from 'components/RoutePrivate';

export class App extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(this.props, nextProps);

    /* istanbul ignore else */
    if (changedTo('user.isAuthenticated', true)) {
      dispatch(showAlert('Hello! And welcome!', { type: 'success', icon: 'i-trophy' }));
    }
  }

  render() {
    const { app, dispatch, user } = this.props;

    return (
      <ConnectedRouter history={history}>
        <div
          className={cx('app', {
            'app--private': user.isAuthenticated,
          })}
        >
          <Helmet
            defer={false}
            htmlAttributes={{ lang: 'pt-br' }}
            encodeSpecialCharacters={true}
            defaultTitle={config.title}
            titleTemplate={`%s | ${config.name}`}
            titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
          />
          {user.isAuthenticated && <Header dispatch={dispatch} user={user} />}
          <main className="app__main">
            <Switch>
              <RoutePublic isAuthenticated={user.isAuthenticated} path="/" exact component={Home} />
              <RoutePrivate isAuthenticated={user.isAuthenticated} path="/private" component={Private} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
          <SystemAlerts alerts={app.alerts} dispatch={dispatch} />
        </div>
      </ConnectedRouter>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
