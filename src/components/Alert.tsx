import { MouseEvent, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Alert as AlertComponent, Box, Icon, Types } from '@gilbarbara/components';

import theme from '~/modules/theme';

import { AlertType } from '~/types';

interface Props {
  children: ReactNode;
  handleClickClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  icon?: Types.Icons;
  id?: string;
  type?: AlertType;
}

AlertComponent.displayName = 'AlertComponent';

const AlertButton = styled.button`
  color: #fff;
  line-height: 0;
  pointer-events: all;
  position: absolute;
  right: ${theme.spacing.xs};
  top: ${theme.spacing.xs};
`;

function Alert({ children, handleClickClose, id, type = 'neutral', ...rest }: Props) {
  const output: Record<string, any> = {};

  if (handleClickClose) {
    output.button = (
      <AlertButton data-id={id} onClick={handleClickClose} type="button">
        <Icon name="times" size={10} />
      </AlertButton>
    );
  }

  return (
    <AlertComponent {...rest} align="center" data-component-name="Alert" type={type}>
      <Box pl={handleClickClose ? 'sm' : 'xs'}>{children}</Box>
      {output.button}
    </AlertComponent>
  );
}

export default Alert;
