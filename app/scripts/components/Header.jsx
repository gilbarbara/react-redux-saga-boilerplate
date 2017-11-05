import React from 'react';
import PropTypes from 'prop-types';

import { logOut } from 'actions';
import Logo from 'components/Logo';

export default class Header extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  handleClickLogout = e => {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(logOut());
  };

  render() {
    return (
      <header className="app__header">
        <div className="app__container">
          <Logo />
          <div className="app__header__menu">
            <ul className="list-unstyled">
              <li>
                <a href="#logout" className="app__logout" onClick={this.handleClickLogout}>
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
