import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Container, Heading } from 'styled-minimal';
import Background from 'components/Background';

const StyledContainer = styled(Container)`
  align-items: center;
  text-align: center;

  h1,
  a {
    color: #fff;
    line-height: 1;
  }

  a {
    text-decoration: underline;
  }
`;

const NotFound = () => (
  <Background key="404">
    <StyledContainer layout="fullScreen" verticalPadding>
      <Heading fontSize={100}>404</Heading>
      <Link to="/">
        <Heading as="h2">go home</Heading>
      </Link>
    </StyledContainer>
  </Background>
);

export default NotFound;
