import { Box, Container } from '@gilbarbara/components';

function Footer() {
  return (
    <Box as="footer" border={{ size: 1, side: 'top', color: 'gray.200' }}>
      <Container py="lg">
        <Box flexBox justify="space-between">
          <iframe
            frameBorder="0"
            height="20px"
            scrolling="0"
            src="https://ghbtns.com/github-btn.html?user=gilbarbara&repo=react-redux-saga-boilerplate&type=star&count=true"
            title="GitHub Stars"
            width="110px"
          />
          <iframe
            frameBorder="0"
            height="20px"
            scrolling="0"
            src="https://ghbtns.com/github-btn.html?user=gilbarbara&type=follow&count=true"
            title="GitHub Follow"
            width="135px"
          />
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
