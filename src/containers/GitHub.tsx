import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUpdateEffect } from 'react-use';
import styled from '@emotion/styled';
import {
  Anchor,
  Box,
  Button,
  ButtonGroup,
  Grid,
  H5,
  Loader,
  NonIdealState,
  Paragraph,
  responsive,
} from '@gilbarbara/components';
import useTreeChanges from 'tree-changes-hook';

import { topic } from '~/config';

import { useAppSelector } from '~/modules/hooks';
import theme, { appColor } from '~/modules/theme';

import { alertShow, getRepos, setAppOptions } from '~/actions';
import { STATUS } from '~/literals';

import { selectApp, selectGitHub } from '~/selectors';

const Item = styled(Anchor)`
  align-items: center;
  border: solid 1px ${appColor};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: ${theme.spacing.md};
  text-align: center;
  width: 100%;

  ${responsive({
    md: {
      padding: theme.spacing.md,
    },
    lg: {
      padding: theme.spacing.lg,
    },
  })};

  p {
    color: #000;
    word-break: break-word;
  }

  img {
    height: 80px;
    margin-bottom: ${theme.spacing.sm};
  }
`;

const ItemHeader = styled.div`
  margin-bottom: ${theme.spacing.md};

  small {
    color: ${theme.grayScale['600']};
  }
`;

const GridResponsive = styled(Grid)`
  gap: ${theme.spacing.xs};
  grid-template-columns: 100%;
  width: 100%;

  ${responsive({
    sm: {
      gap: theme.spacing.sm,
      width: '90%',
    },
    md: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    lg: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    xl: {
      gap: theme.spacing.lg,
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  })};
`;

function GitHub() {
  const dispatch = useDispatch();
  const gitHub = useAppSelector(selectGitHub);
  const { query } = useAppSelector(selectApp);

  const { changed } = useTreeChanges(gitHub.topics[query] ?? topic);

  const { data = [], message = '', status = STATUS.IDLE } = gitHub.topics[query] ?? topic;

  useEffect(() => {
    dispatch(getRepos(query));
  }, [dispatch, query]);

  useUpdateEffect(() => {
    if (changed('status', STATUS.ERROR)) {
      dispatch(alertShow(message, { type: 'error' }));
    }
  }, [changed, dispatch, message]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { value = '' } = event.currentTarget.dataset;

      dispatch(setAppOptions({ query: value }));
    },
    [dispatch],
  );

  const isRunning = status === STATUS.RUNNING;
  let output;

  if (status === STATUS.SUCCESS) {
    output = data.length ? (
      <GridResponsive
        data-component-name="GitHubGrid"
        data-value={query}
        mt="xl"
        mx="auto"
        padding={0}
      >
        {data.map((d: Record<string, any>) => (
          <Item key={d.id} href={d.html_url} target="_blank">
            <img alt={d.owner.login} src={d.owner.avatar_url} />
            <ItemHeader>
              <H5 height={100} lineHeight={1}>
                {d.name}
              </H5>
              <small>{d.owner.login}</small>
            </ItemHeader>
            <Paragraph>{d.description}</Paragraph>
          </Item>
        ))}
      </GridResponsive>
    ) : (
      <NonIdealState description="Nothing found" type={null} />
    );
  } else {
    output = <Loader block />;
  }

  return (
    <div key="GitHub" data-component-name="GitHubWrapper">
      <Box flexBox justify="center">
        <ButtonGroup aria-label="GitHub Selector" data-component-name="GitHubSelector" role="group">
          <Button
            busy={query === 'react' && isRunning}
            data-value="react"
            invert={query !== 'react'}
            onClick={handleClick}
            size="md"
          >
            React
          </Button>
          <Button
            busy={query === 'redux' && isRunning}
            data-value="redux"
            invert={query !== 'redux'}
            onClick={handleClick}
            size="md"
          >
            Redux
          </Button>
        </ButtonGroup>
      </Box>
      {output}
    </div>
  );
}

export default GitHub;
