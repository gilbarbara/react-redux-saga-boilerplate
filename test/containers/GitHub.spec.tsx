import React from 'react';

import { ActionTypes } from 'literals';

import GitHub from 'containers/GitHub';

import githubRepos from 'test/__fixtures__/github-repos.json';
import { fireEvent, render, waitFor } from 'test-utils';

const mockDispatch = jest.fn();

describe('GitHub', () => {
  afterEach(() => {
    mockDispatch.mockClear();
    fetchMock.resetMocks();
  });

  it('should render a loader and dispatch the action', () => {
    const { container } = render(<GitHub />, { mockDispatch });

    expect(container).toMatchSnapshot();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionTypes.GITHUB_GET_REPOS_REQUEST,
      payload: { query: 'react' },
    });
  });

  it('should render the repos', async () => {
    fetchMock.mockResponse(JSON.stringify({ items: githubRepos.items.slice(0, 2) }));

    const { findByTestId } = render(<GitHub />);
    const repos = await findByTestId('GitHubGrid');

    expect(repos.outerHTML).toMatchSnapshot();
  });

  it("should render a message if there's no data", async () => {
    fetchMock.mockResponse(JSON.stringify({ items: [] }));

    const { findByText } = render(<GitHub />);

    const repos = await findByText('Nothing found');

    expect(repos).toMatchSnapshot();
  });

  it('should dispatch an action when click selector button', async () => {
    fetchMock.mockResponse(JSON.stringify({ items: [] }));
    const { getByRole } = render(<GitHub />, { mockDispatch });

    fireEvent.click(getByRole('button', { name: 'Redux' }));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'GITHUB_GET_REPOS_REQUEST',
      payload: { query: 'redux' },
    });
  });

  it('should dispatch an alert with errors', async () => {
    fetchMock.mockReject(new Error('Nothing found'));

    render(<GitHub />, { mockDispatch });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SHOW_ALERT',
        payload: {
          id: 'ABCDEF',
          icon: undefined,
          message: new Error('Nothing found'),
          position: 'bottom-right',
          variant: 'danger',
          timeout: 0,
        },
      });
    });
  });
});
