import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Box, Button, Container, Icon, responsive, Text } from '@gilbarbara/components';

import { name } from '~/config';

import theme from '~/modules/theme';

import { login } from '~/actions';
import { STATUS } from '~/literals';

import Background from '~/components/Background';
import Logo from '~/components/Logo';

import { RootState } from '~/types';

const Header = styled.div`
  margin-bottom: ${theme.spacing.lg};
  text-align: center;

  svg {
    height: 100px;
    width: auto;

    ${responsive({
      lg: {
        height: '180px',
      },
    })};
  }
`;

const Heading = styled.h1`
  color: #fff;
  font-size: 35px;
  line-height: 1.4;
  margin-bottom: ${theme.spacing.lg};
  margin-top: 0;
  text-align: center;

  ${responsive({
    lg: {
      fontSize: '40px',
    },
  })};
`;

function Home() {
  const dispatch = useDispatch();
  const status = useSelector<RootState>(({ user }) => user.status);

  const handleClickLogin = () => {
    dispatch(login());
  };

  return (
    <Background key="Home" data-component-name="Home">
      <Container fullScreen justify="center">
        <Box textAlign="center">
          <Header>
            <Logo />
          </Header>
          <Heading>{name}</Heading>
          <Button
            bg="white"
            busy={status === STATUS.RUNNING}
            data-component-name="Start"
            onClick={handleClickLogin}
            size="lg"
          >
            <Icon mr="xs" name="star" size={24} />
            <Text size="lg">Start</Text>
          </Button>
        </Box>
      </Container>
    </Background>
  );
}

export default Home;
