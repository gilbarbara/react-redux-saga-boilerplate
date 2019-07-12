import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ReactComponent as Icon } from 'assets/media/brand/icon.svg';
import { ReactComponent as RRS } from 'assets/media/brand/react-redux-saga.svg';

export const Wrapper = styled.div`
  align-items: flex-start;
  display: inline-flex;
  font-size: 0;

  svg {
    height: 4.2rem;
    max-height: 100%;
    width: auto;
  }
`;

const Logo = ({ type = 'icon' }) => <Wrapper>{type === 'icon' ? <Icon /> : <RRS />}</Wrapper>;

Logo.propTypes = {
  type: PropTypes.string,
};

export default Logo;
