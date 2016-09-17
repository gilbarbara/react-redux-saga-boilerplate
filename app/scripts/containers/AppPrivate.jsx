import React from 'react';
import { connect } from 'react-redux';

import Header from 'components/Header';
import Footer from 'components/Footer';
import SystemNotifications from 'components/SystemNotifications';

export class AppPrivate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: false
    };
  }

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired
  };

  render() {
    const { dispatch, user } = this.props;

    return (
      <div key="app" className="app app--private">
        <Header dispatch={dispatch} user={user} />
        <main className="app__main">
          {this.props.children}
        </main>
        <Footer />
        <SystemNotifications />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(AppPrivate);
