import React from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { shouldComponentUpdate } from 'utils/helpers';

import { hideAlert } from 'actions';

export class SystemNotifications extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate = shouldComponentUpdate;

  componentDidUpdate() {
    if (this.props.app.notifications.visible && this.props.app.notifications.withTimeout) {
      window.clearTimeout(this.hideTimeout);

      /* istanbul ignore next */
      this.hideTimeout = setTimeout(() => {
        this.hideNotification();
      }, 3500);
    }
  }

  hideNotification() {
    this.props.dispatch(hideAlert());
  }

  @autobind
  onClick() {
    window.clearTimeout(this.hideTimeout);
    this.hideNotification();
  }

  render() {
    const notifications = this.props.app.notifications;

    const classes = `app__notifications${(notifications.visible ? ' active' : '')}${(notifications.status ? ` ${notifications.status}` : '')}`;
    const iconClass = {
      success: 'i-thumbs-up',
      warning: 'i-exclamation-circle',
      info: 'i-info-circle',
      error: 'i-thumbs-down'
    };

    return (
      <div key="SystemNotification" className={classes} onClick={this.onClick}>
        <div>
          <i className={iconClass[notifications.status]} />
          <div>{notifications.message}</div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { app: state.app };
}

export default connect(mapStateToProps)(SystemNotifications);
