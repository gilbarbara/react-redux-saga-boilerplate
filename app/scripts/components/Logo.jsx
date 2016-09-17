import React from 'react';
import Isvg from 'react-inlinesvg';

import config from 'config';

const Logo = ({ file }) =>
  (<div className="app__logo">
    <Isvg src={require(`../../media/brand/${file}.svg`)}>
      <img src={require(`../../media/brand/${file}.png`)} alt={config.title} />
    </Isvg>
  </div>);

Logo.propTypes = {
  file: React.PropTypes.string
};

Logo.defaultProps = {
  file: 'icon'
};

export default Logo;
