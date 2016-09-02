import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

class Loader extends React.Component {
  static propTypes = {
    pulse: React.PropTypes.bool
  };

  static defaultProps = {
    pulse: true
  };

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    const props = this.props;
    let html;

    if (props.pulse) {
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
              strokeWidth="2" />
          </svg>
        </div>
      );
    }

    return (html);
  }
}

export default Loader;
