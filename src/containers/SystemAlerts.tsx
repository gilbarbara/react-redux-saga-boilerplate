import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useUnmount } from 'react-use';
import styled from '@emotion/styled';
import { responsive } from '@gilbarbara/components';

import { useAppSelector } from '~/modules/hooks';
import theme from '~/modules/theme';

import { alertHide } from '~/actions';

import Alert from '~/components/Alert';
import Transition from '~/components/Transition';

const Base = styled.div`
  position: fixed;
  z-index: 1000;

  > div {
    > * + * {
      margin-top: ${theme.spacing.md};
    }
  }
`;

const TopLeft = styled(Base)`
  left: ${theme.spacing.md};
  top: ${theme.spacing.md};
  width: 260px;

  ${
    /* sc-custom '@media-query' */ responsive({
      md: {
        width: '32rem',
      },
    })
  };
`;

const TopRight = styled(Base)`
  right: ${theme.spacing.md};
  top: ${theme.spacing.md};
  width: 260px;

  ${
    /* sc-custom '@media-query' */ responsive({
      md: {
        width: '32rem',
      },
    })
  };
`;

const BottomLeft = styled(Base)`
  bottom: ${theme.spacing.md};
  left: ${theme.spacing.md};
  width: 260px;

  ${
    /* sc-custom '@media-query' */ responsive({
      md: {
        width: '32rem',
      },
    })
  };
`;

const BottomRight = styled(Base)`
  bottom: ${theme.spacing.md};
  right: ${theme.spacing.md};
  width: 260px;

  ${
    /* sc-custom '@media-query' */ responsive({
      md: {
        width: '32rem',
      },
    })
  };
`;

const SystemAlertsWrapper = styled.div`
  pointer-events: none;
  position: fixed;
  z-index: 1000;
`;

export default function SystemAlerts() {
  const dispatch = useDispatch();
  const alerts = useAppSelector(s => s.alerts.data);
  const timeouts: Record<string, any> = useRef({});

  useEffect(() => {
    const { current } = timeouts;

    if (alerts.length) {
      alerts.forEach(d => {
        if (d.timeout && !current[d.id]) {
          current[d.id] = setTimeout(() => {
            dispatch(alertHide(d.id));
          }, d.timeout * 1000);
        }
      });
    }
  }, [alerts, dispatch]);

  useUnmount(() => {
    const { current } = timeouts;

    Object.keys(current).forEach(d => {
      clearTimeout(current[d]);
    });
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const { id = '' } = event.currentTarget.dataset;

      dispatch(alertHide(id));
    },
    [dispatch],
  );

  const renderAlerts = useCallback(
    (position: string) => {
      const items = alerts.filter(d => d.position === position);

      if (!items.length) {
        return null;
      }

      return items.map(d => (
        <Alert key={d.id} handleClickClose={handleClick} icon={d.icon} id={d.id} type={d.type}>
          {d.message}
        </Alert>
      ));
    },
    [alerts, handleClick],
  );

  return (
    <SystemAlertsWrapper key="SystemAlerts">
      <TopLeft>
        <Transition transition="slideRight">{renderAlerts('top-left')}</Transition>
      </TopLeft>
      <TopRight>
        <Transition transition="slideLeft">{renderAlerts('top-right')}</Transition>
      </TopRight>
      <BottomLeft>
        <Transition transition="slideRight">{renderAlerts('bottom-left')}</Transition>
      </BottomLeft>
      <BottomRight>
        <Transition transition="slideLeft">{renderAlerts('bottom-right')}</Transition>
      </BottomRight>
    </SystemAlertsWrapper>
  );
}
