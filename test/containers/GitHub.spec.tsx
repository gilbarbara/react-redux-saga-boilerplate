import React from 'react';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from 'test-utils';

import { alertShow, getRepos } from '~/actions';

import GitHub from '~/containers/GitHub';

import githubRepos from 'test/__fixtures__/github-repos.json';

const mockDispatch = vi.fn();

describe('GitHub', () => {
  afterEach(() => {
    mockDispatch.mockClear();
    fetchMock.resetMocks();
  });

  it('should render a loader, dispatch the action and render no results', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ items: [] }));

    render(<GitHub />, { mockDispatch });

    expect(mockDispatch).toHaveBeenCalledWith(getRepos('react'));

    expect(screen.getByTestId('GitHubWrapper')).toMatchSnapshot();

    await waitForElementToBeRemoved(() => screen.queryByTestId('LoaderPill'));
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('should render the repos', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ items: githubRepos.items.slice(0, 2) }));

    render(<GitHub />);

    await waitForElementToBeRemoved(() => screen.queryByTestId('LoaderPill'));

    expect(screen.getByTestId('GitHubGrid')).toMatchSnapshot();
  });

  it('should dispatch an action when click selector button', async () => {
    render(<GitHub />, { mockDispatch });

    fireEvent.click(screen.getByRole('button', { name: 'Redux' }));

    expect(mockDispatch).toHaveBeenCalledWith(getRepos('redux'));

    await waitForElementToBeRemoved(() => screen.queryByTestId('LoaderPill'));
  });

  it('should dispatch an alert with errors', async () => {
    fetchMock.mockRejectOnce(new Error('Nothing found'));

    render(<GitHub />, { mockDispatch });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: alertShow.type,
        payload: {
          id: '8cdee72f-28d4-4441-91f0-c61f6e3d9684',
          icon: 'info-o',
          message: 'Nothing found',
          position: 'bottom-right',
          type: 'error',
          timeout: 0,
        },
      });
    });
  });
});
