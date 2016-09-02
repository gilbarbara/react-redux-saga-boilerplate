import React from 'react';
import { autobind } from 'core-decorators';
import { shouldComponentUpdate } from 'utils/helpers';

import { goTo, logOut } from 'actions';

import Logo from 'components/Logo';

export default class Header extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired
  };

  shouldComponentUpdate = shouldComponentUpdate;

  @autobind
  onClickLogo(e) {
    e.preventDefault();

    this.props.dispatch(goTo(e.currentTarget.getAttribute('href')));
  }

  @autobind
  onClickLogout(e) {
    e.preventDefault();

    this.props.dispatch(logOut());
  }

  render() {
    return (
      <header className="app__header">
        <div className="app__container">
          <a href="/" className="app__header__logo" onClick={this.onClickLogo}><Logo /></a>
          <div className="app__header__menu">
            <ul className="list-unstyled">
              <li>
                <a href="#logout" className="app__logout" onClick={this.onClickLogout}>
                  <span>logout</span><i className="i-sign-out" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
