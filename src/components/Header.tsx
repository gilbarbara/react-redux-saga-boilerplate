import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Container, Icon, responsive, Text } from '@gilbarbara/components';

import { appColor, headerHeight } from '~/modules/theme';

import { logOut } from '~/actions';

import Logo from '~/components/Logo';

const HeaderWrapper = styled.header`
  background-color: #113740;
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
    height: 2px;
    left: 0;
    position: absolute;
    right: 0;
  }
`;

const Logout = styled.button`
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 14px;

  ${responsive({ lg: { fontSize: '16px' } })};

  span {
    display: inline-block;
    text-transform: uppercase;
  }
`;

export default function Header() {
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logOut());
  };

  return (
    <HeaderWrapper data-component-name="Header">
      <Container direction="row" justify="space-between" padding="md">
        <Logo />
        <Logout data-component-name="Logout" onClick={handleClickLogout}>
          <Text>logout</Text>
          <Icon ml="xs" name="sign-out" />
        </Logout>
      </Container>
    </HeaderWrapper>
  );
}
