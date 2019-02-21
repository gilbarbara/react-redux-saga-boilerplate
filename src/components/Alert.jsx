import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'modules/theme';

import { Alert as AlertComponent, Box, utils } from 'styled-minimal';
import Icon from 'components/Icon';

const { colors, palette } = utils.getTheme(theme);
const variants = { ...colors, ...palette };

AlertComponent.displayName = 'AlertComponent';

const AlertWrapper = styled(AlertComponent)`
  display: flex;
  line-height: 1;
  padding: 0;
  position: relative;
`;

const AlertIcon = styled.div`
  align-items: flex-start;
  background-color: ${({ variant }) => variants[variant]};
  color: #fff;
  display: flex;
  padding: ${utils.spacer(3)};
`;

const AlertButton = styled.button`
  background-color: ${({ variant }) => variants[variant]};
  color: #ccc;
  pointer-events: all;
  position: absolute;
  right: ${utils.spacer(1)};
  top: ${utils.spacer(1)};
`;

const Alert = ({ children, handleClickClose, id, icon, ...rest }) => {
  const output = {};
  let name;

  switch (rest.variant) {
    case 'success': {
      name = icon || 'check-circle';
      break;
    }
    case 'warning': {
      name = icon || 'exclamation-circle';
      break;
    }
    case 'danger': {
      name = icon || 'times-circle';
      break;
    }
    case 'info': {
      name = icon || 'question-circle';
      break;
    }
    case 'dark': {
      name = icon || 'bell-o';
      break;
    }
    default: {
      name = icon || 'dot-circle-o';
    }
  }

  if (handleClickClose) {
    output.button = (
      <AlertButton data-id={id} onClick={handleClickClose} type="button" data-testid="AlertButton">
        <Icon name="times" width={10} />
      </AlertButton>
    );
  }

  return (
    <AlertWrapper {...rest} data-testid="AlertWrapper">
      <AlertIcon {...rest}>
        <Icon name={name} width={24} />
      </AlertIcon>
      <Box p={2} pr={handleClickClose ? 3 : 2}>
        {children}
      </Box>
      {output.button}
    </AlertWrapper>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  handleClickClose: PropTypes.func,
  icon: PropTypes.string,
  id: PropTypes.string,
  outline: PropTypes.bool,
  variant: PropTypes.string,
};

Alert.defaultProps = {
  outline: true,
  variant: 'info',
};

export default Alert;
