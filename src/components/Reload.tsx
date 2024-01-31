import { useCallback } from 'react';
import styled from '@emotion/styled';
import { Button, H6 } from '@gilbarbara/components';

export const ReloadWrapper = styled.div`
  button {
    pointer-events: all;
  }
`;

function Reload() {
  const handleClick = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <ReloadWrapper data-component-name="Reload">
      <H6 mb="lg">There's a new version of this app!</H6>
      <Button bg="black" invert onClick={handleClick} size="xs">
        Reload
      </Button>
    </ReloadWrapper>
  );
}

export default Reload;
