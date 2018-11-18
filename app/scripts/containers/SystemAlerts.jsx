import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { utils } from 'styled-minimal';
import { hideAlert } from 'actions';

import Transition from 'components/Transition';
import Alert from 'components/Alert';

const Base = styled.div`
  position: fixed;
  z-index: 1000;

  > div {
    > * + * {
      margin-top: ${utils.spacer(3)};
    }
  }
`;

const TopLeft = styled(Base)`
  left: ${utils.spacer(3)};
  top: ${utils.spacer(3)};
  width: 26rem;

  ${utils.responsive({
    md: `
      width: 32rem;
    `,
  })};
`;

const TopRight = styled(Base)`
  right: ${utils.spacer(3)};
  top: ${utils.spacer(3)};
  width: 26rem;
  
  ${utils.responsive({
    md: `
      width: 32rem;
    `,
  })};
`;

const BottomLeft = styled(Base)`
  bottom: ${utils.spacer(3)};
  left: ${utils.spacer(3)};
  width: 26rem;
  
  ${utils.responsive({
    md: `
      width: 32rem;
    `,
  })};
`;

const BottomRight = styled(Base)`
  bottom: ${utils.spacer(3)};
  right: ${utils.spacer(3)};
  width: 26rem;
  
  ${utils.responsive({
    md: `
      width: 32rem;
    `,
  })};
`;

const StyledSystemAlerts = styled.div`
  pointer-events: none;
  position: fixed;
  z-index: 1000;
`;

export class SystemAlerts extends React.PureComponent {
  constructor(props) {
    super(props);

    this.timeouts = {};
  }

  static propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { app: { alerts: nextAlerts }, dispatch } = nextProps;

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
    const { app } = this.props;
    const items = app.alerts.filter(d => d.position === position);

    if (!items.length) {
      return null;
    }

    return items.map(d => (
      <Alert
        key={d.id}
        id={d.id}
        icon={d.icon}
        handleClickClose={this.handleClick}
        variant={d.variant}
      >
        {d.message}
      </Alert>
    ));
  }

  render() {
    return (
      <StyledSystemAlerts key="SystemAlerts">
        <TopLeft>
          <Transition transition="slideDown">
            {this.renderAlerts('top-left')}
          </Transition>
        </TopLeft>
        <TopRight>
          <Transition transition="slideDown">
            {this.renderAlerts('top-right')}
          </Transition>
        </TopRight>
        <BottomLeft>
          <Transition transition="slideUp">
            {this.renderAlerts('bottom-left')}
          </Transition>
        </BottomLeft>
        <BottomRight>
          <Transition transition="slideUp">
            {this.renderAlerts('bottom-right')}
          </Transition>
        </BottomRight>
      </StyledSystemAlerts>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { app: state.app };
}

export default connect(mapStateToProps)(SystemAlerts);
