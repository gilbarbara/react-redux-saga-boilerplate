import PropTypes from 'prop-types';
import React from 'react';

const Loader = ({ pulse }) => {
  let html;

  if (pulse) {
    html = (
      <div className="app__loader app__loader--pulse">
        <div />
      </div>
    );
  }
  else {
    html = (
      <div className="app__loader app__loader--rotate">
        <svg className="loader__svg">
          <circle
            className="loader__circle"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }

  return html;
};

Loader.propTypes = {
  pulse: PropTypes.bool.isRequired,
};

Loader.defaultProps = {
  pulse: true,
};

export default Loader;
