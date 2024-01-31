import SVG from 'react-inlinesvg';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  align-items: flex-start;
  display: inline-flex;
  font-size: 0;

  svg {
    height: 42px;
    max-height: 100%;
    width: auto;
  }
`;

function Logo() {
  return (
    <Wrapper>
      <SVG src="/media/brand/icon.svg" />
    </Wrapper>
  );
}

export default Logo;
