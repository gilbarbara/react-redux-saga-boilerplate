import React from 'react';
import styled from 'styled-components';

import { Button, Heading } from 'styled-minimal';

export const ReloadWrapper = styled.div`
  button {
    pointer-events: all;
  }
`;

const Reload = () => (
  <ReloadWrapper>
    <Heading as="h6" mb={3}>
      There's a new version of this app!
    </Heading>
    <Button variant="dark" outline size="sm" onClick={() => window.location.reload()}>
      Reload
    </Button>
  </ReloadWrapper>
);

export default Reload;
