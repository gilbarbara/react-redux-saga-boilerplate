import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Icon } from 'assets/media/brand/icon.svg';

export const StyledLogo = styled.div`
  align-items: flex-start;
  display: inline-flex;
  font-size: 0;

  svg {
    height: auto;
    max-height: 100%;
    width: 4.8rem;
  }
`;

const Logo = () => (
  <StyledLogo>
    <Icon />
  </StyledLogo>
);

export default Logo;
