import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

export default class NotFound extends React.Component {
  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    return (
      <div key="404" className="app__not-found app__route">
        <h1>404</h1>
      </div>
    );
  }
}
