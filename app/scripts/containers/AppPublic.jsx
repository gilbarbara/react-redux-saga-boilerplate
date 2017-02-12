import React from 'react';

import Footer from 'components/Footer';
import SystemNotifications from 'components/SystemNotifications';

export default class AppPublic extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  };

  render() {
    return (
      <div key="app" className="app app--public">
        <main className="app__main">
          {this.props.children}
        </main>
        <Footer />
        <SystemNotifications />
      </div>
    );
  }
}

