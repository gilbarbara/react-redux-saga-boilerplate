import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';

import { hideAlert } from 'actions';

export const SystemNotifications = ({ app, dispatch }) => {
  let hideTimeout;

  const hideNotification = () => {
    dispatch(hideAlert());
  };

  const onClick = () => {
    window.clearTimeout(hideTimeout);
    hideNotification();
  };

  if (app.notifications.visible && app.notifications.withTimeout) {
    window.clearTimeout(hideTimeout);

    /* istanbul ignore next */
    hideTimeout = setTimeout(() => {
      hideNotification();
    }, 3500);
  }

  const notifications = app.notifications;
  const iconClass = {
    success: 'i-thumbs-up',
    warning: 'i-exclamation-circle',
    info: 'i-info-circle',
    error: 'i-thumbs-down'
  };

  return (
    <a
      href="#close"
      key="SystemNotification"
      className={cx(`app__notifications ${notifications.status}`, {
        active: notifications.visible
      })}
      onClick={onClick}>
      <div>
        <i className={iconClass[notifications.status]} />
        <div>{notifications.message}</div>
      </div>
    </a>
  );
};

SystemNotifications.propTypes = {
  app: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};


/* istanbul ignore next */
function mapStateToProps(state) {
  return { app: state.app };
}

export default connect(mapStateToProps)(SystemNotifications);
