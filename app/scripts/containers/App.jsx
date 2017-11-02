import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Helmet from 'react-helmet';
import cx from 'classnames';
import history from 'modules/history';
import RoutePublic from 'modules/RoutePublic';
import RoutePrivate from 'modules/RoutePrivate';

import config from 'config';

import Home from 'routes/Home';
import Private from 'routes/Private';
import NotFound from 'routes/NotFound';

import Header from 'components/Header';
import Footer from 'components/Footer';
import SystemNotifications from 'components/SystemNotifications';

export class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, user } = this.props;

    return (
      <ConnectedRouter history={history} basename={APP__TARGET === 'pages' ? '/react-redux-saga-boilerplate' : '/'}>
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
          <SystemNotifications />
        </div>
      </ConnectedRouter>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(App);
