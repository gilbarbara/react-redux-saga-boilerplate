import React from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { shouldComponentUpdate } from 'utils/helpers';
import config from 'config';

import Logo from 'components/Logo';
import { login } from 'actions';

export class Home extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired
  };

  shouldComponentUpdate = shouldComponentUpdate;

  @autobind
  onClickLogin(e) {
    e.preventDefault();

    this.props.dispatch(login());
  }

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
              onClick={this.onClickLogin}
              className="btn btn-lg btn-primary btn-icon">
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
