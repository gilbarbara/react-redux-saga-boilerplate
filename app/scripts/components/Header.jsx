import PropTypes from 'prop-types';
import React from 'react';

import { goTo, logOut } from 'actions';
import Logo from 'components/Logo';

const Header = ({ dispatch }) => {
  const onClickLogo = e => {
    e.preventDefault();
    dispatch(goTo(e.currentTarget.getAttribute('href')));
  };

  const onClickLogout = e => {
    e.preventDefault();
    dispatch(logOut());
  };

  return (
    <header className="app__header">
      <div className="app__container">
        <a href="/" className="app__header__logo" onClick={onClickLogo}><Logo /></a>
        <div className="app__header__menu">
          <ul className="list-unstyled">
            <li>
              <a href="#logout" className="app__logout" onClick={onClickLogout}>
                <span>logout</span><i className="i-sign-out" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Header;
