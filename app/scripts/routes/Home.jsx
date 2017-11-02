import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate } from 'utils/helpers';
import config from 'config';

import Logo from 'components/Logo';
import { login } from 'actions/index';

export class Home extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  shouldComponentUpdate = shouldComponentUpdate;

  handleClickLogin = (e) => {
    e.preventDefault();

    this.props.dispatch(login());
  };

  render() {
    return (
      <div key="Home" className="app__home app__route">
        <div className="app__container">
          <div className="app__home__wrapper">
            <div className="app__home__header">
              <Logo />
            </div>
            <h1>{config.description}</h1>
            <a
              href="#login"
              onClick={this.handleClickLogin}
              className="btn btn-lg btn-primary btn-icon"
            >
              <i className="i-sign-in" />
              <span>Login</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Home);
