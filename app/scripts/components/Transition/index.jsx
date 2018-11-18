import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import transitions from './transitions';

const Transition = ({ children, className, style, transition, ...rest }) => {
  const Component = transitions[transition];

  if (!Component) {
    console.error(`Invalid transition: ${transition}`); //eslint-disable-line no-console
    return null;
  }

  return (
    <TransitionGroup className={className} style={style}>
      {React.Children.map(children, child => (
        <CSSTransition classNames={transition} {...rest}>
          <Component>{child}</Component>
        </CSSTransition>
      ))
      }
    </TransitionGroup>
  );
};

Transition.propTypes = {
  appear: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  enter: PropTypes.bool,
  exit: PropTypes.bool,
  style: PropTypes.object,
  timeout: PropTypes.number,
  transition: PropTypes.oneOf(Object.keys(transitions)),
};

Transition.defaultProps = {
  appear: false,
  enter: true,
  exit: true,
  style: null,
  timeout: 300,
  transition: 'fade',
};

export default Transition;
