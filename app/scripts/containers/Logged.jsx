import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

import readme from '../../../README.md';

export default class Logged extends React.Component {
  static propTypes = {
    location: React.PropTypes.object.isRequired
  };

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    return (
      <div key="Logged" className="app__logged app__route">
        <div className="app__container" dangerouslySetInnerHTML={{ __html: readme }} />
      </div>
    );
  }
}
