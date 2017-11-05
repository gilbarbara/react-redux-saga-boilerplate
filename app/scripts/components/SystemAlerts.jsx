import React from 'react';
import PropTypes from 'prop-types';

import { hideAlert } from 'actions';

import Transition from 'components/Transition';
import Alert from 'components/Alert';

export default class SystemAlerts extends React.Component {
  constructor(props) {
    super(props);

    this.timeouts = {};
  }

  static propTypes = {
    alerts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { alerts: nextAlerts, dispatch } = nextProps;

    /* istanbul ignore else */
    if (nextAlerts.length) {
      nextAlerts.forEach(d => {
        if (d.timeout && !this.timeouts[d.id]) {
          this.timeouts[d.id] = setTimeout(() => {
            dispatch(hideAlert(d.id));
          }, d.timeout * 1000);
        }
      });
    }
  }

  componentWillUnmount() {
    Object.keys(this.timeouts).forEach(d => {
      clearTimeout(this.timeouts[d]);
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    const { dataset } = e.currentTarget;
    const { dispatch } = this.props;

    dispatch(hideAlert(dataset.id));
  };

  renderAlerts(position) {
    const { alerts } = this.props;
    const items = alerts.filter(d => d.position === position);

    if (!items.length) {
      return null;
    }

    return items.map(d => (
      <Alert
        key={d.id}
        id={d.id}
        icon={d.icon}
        handleClickClose={this.handleClick}
        type={d.type}
      >
        {d.message}
      </Alert>
    ));
  }

  render() {
    return (
      <div key="SystemAlerts" className="app__system-alerts">
        <div className="app__system-alerts__top">
          <Transition classNames="transition-slide-down">
            {this.renderAlerts('top')}
          </Transition>
        </div>
        <div className="app__system-alerts__top-left">
          <Transition classNames="transition-slide-right">
            {this.renderAlerts('top-left')}
          </Transition>
        </div>
        <div className="app__system-alerts__top-right">
          <Transition classNames="transition-slide-left">
            {this.renderAlerts('top-right')}
          </Transition>
        </div>
        <div className="app__system-alerts__bottom">
          <Transition classNames="transition-slide-up">
            {this.renderAlerts('bottom')}
          </Transition>
        </div>
        <div className="app__system-alerts__bottom-left">
          <Transition classNames="transition-slide-right">
            {this.renderAlerts('bottom-left')}
          </Transition>
        </div>
        <div className="app__system-alerts__bottom-right">
          <Transition classNames="transition-slide-left">
            {this.renderAlerts('bottom-right')}
          </Transition>
        </div>
      </div>
    );
  }
}
