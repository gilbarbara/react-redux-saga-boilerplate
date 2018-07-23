import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ children, handleClickClose, id, icon, type }) => {
  const output = {};
  const typeClass = type ? ` is-${type}` : '';

  switch (type) {
    case 'success': {
      output.icon = icon || 'i-check-circle';
      break;
    }
    case 'error': {
      output.icon = icon || 'i-times-circle';
      break;
    }
    case 'warning': {
      output.icon = icon || 'i-exclamation-circle';
      break;
    }
    case 'info': {
      output.icon = icon || 'i-question-circle';
      break;
    }
    case 'black': {
      output.icon = icon || 'i-bell-o';
      break;
    }
    default: {
      output.icon = icon || 'i-dot-circle-o';
    }
  }

  if (handleClickClose) {
    output.button = (
      <button
        className="app__alert__close"
        data-id={id}
        onClick={handleClickClose}
        type="button"
      >
        <i className="i-times" />
      </button>
    );
  }

  return (
    <div className={`app__alert${typeClass}`}>
      <div className="app__alert__icon">
        <i className={output.icon} />
      </div>
      <div className="app__alert__content">{children}</div>
      {output.button}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  handleClickClose: PropTypes.func,
  icon: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
};

export default Alert;
