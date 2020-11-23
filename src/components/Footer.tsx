import React from 'react';
import { Box, Container, Flex } from 'styled-minimal';

function Footer() {
  return (
    <Box as="footer" borderTop="0.1rem solid #ddd">
      <Container py={3}>
        <Flex justifyContent="space-between">
          <iframe
            title="GitHub Stars"
            src="https://ghbtns.com/github-btn.html?user=gilbarbara&repo=react-redux-saga-boilerplate&type=star&count=true"
            frameBorder="0"
            scrolling="0"
            width="110px"
            height="20px"
          />
          <iframe
            title="GitHub Follow"
            src="https://ghbtns.com/github-btn.html?user=gilbarbara&type=follow&count=true"
            frameBorder="0"
            scrolling="0"
            width="130px"
            height="20px"
          />
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
