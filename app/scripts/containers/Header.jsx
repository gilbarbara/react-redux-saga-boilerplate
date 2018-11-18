import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import rgba from 'polished/lib/color/rgba';
import { appColor, headerHeight } from 'modules/theme';

import { logOut } from 'actions';

import { Container, utils } from 'styled-minimal';
import Icon from 'components/Icon';
import Logo, { StyledLogo } from 'components/Logo';

const { responsive, spacer } = utils;

const StyledHeader = styled.header`
  background-color: ${rgba(appColor, 0.9)};
  height: ${headerHeight}px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 200;

  &:before {
    background-color: ${appColor};
    bottom: 0;
    content: '';
    height: 0.2rem;
    left: 0;
    position: absolute;
    right: 0;
  }

  ${StyledLogo} svg {
    width: 5rem;
  }
`;

const StyledContainer = styled(Container)`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  justify-content: space-between;
  padding-bottom: ${spacer(2)};
  padding-top: ${spacer(2)};
`;

const Logout = styled.button`
  align-items: center;
  color: #333;
  display: flex;
  font-size: 1.3rem;

  ${responsive({ lg: 'font-size: 1.6rem;' })};

  &.active {
    color: #000;
  }

  span {
    display: inline-block;
    margin-right: 4px;
    text-transform: uppercase;
  }
`;

export default class Header extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  handleClickLogout = () => {
    const { dispatch } = this.props;

    dispatch(logOut());
  };

  render() {
    return (
      <StyledHeader>
        <StyledContainer>
          <Logo />
          <Logout onClick={this.handleClickLogout}>
            <span>logout</span>
            <Icon name="sign-out" color="#333" width={16} />
          </Logout>
        </StyledContainer>
      </StyledHeader>
    );
  }
}
