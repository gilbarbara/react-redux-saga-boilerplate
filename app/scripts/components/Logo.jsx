import React from 'react';
import Isvg from 'react-inlinesvg';
import { shouldComponentUpdate } from 'utils/helpers';

import config from 'config';

export default class Logo extends React.Component {
  static propTypes = {
    file: React.PropTypes.string
  };

  static defaultProps = {
    file: 'icon'
  };

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    return (
      <div className="app__logo">
        <Isvg src={require(`../../media/brand/${this.props.file}.svg`)}>
          <img src={require(`../../media/brand/${this.props.file}.png`)} alt={config.title} />
        </Isvg>
      </div>
    );
  }
}
