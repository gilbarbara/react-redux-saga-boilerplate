import React from 'react';
import { shouldComponentUpdate } from 'utils/helpers';

import SystemNotifications from 'components/SystemNotifications';

export default class AppPublic extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  };

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    return (
      <div key="app" className="app app--public">
        <main className="app__main">
          {this.props.children}
        </main>
        <SystemNotifications />
      </div>
    );
  }
}

