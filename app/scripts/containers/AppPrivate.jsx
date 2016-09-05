import React from 'react';
import { connect } from 'react-redux';
import { shouldComponentUpdate } from 'utils/helpers';

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
    app: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired
  };

  shouldComponentUpdate = shouldComponentUpdate;

  render() {
    const props = this.props;

    return (
      <div key="app" className="app app--private">
        <Header dispatch={props.dispatch} location={props.location} app={props.app} />
        <main className="app__main">
          {this.props.children}
        </main>
        <Footer app={props.app} dispatch={props.dispatch} />
        <SystemNotifications />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { app: state.app };
}

export default connect(mapStateToProps)(AppPrivate);
