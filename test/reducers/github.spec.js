import reducer from 'reducers/github';
import { ActionTypes } from 'constants/index';

describe('Github', () => {
  it('should return the initial state', () => {
    expect(reducer.github(undefined, {}))
      .toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.GITHUB_GET_REPOS_REQUEST}`, () => {
    expect(reducer.github(undefined, {
      type: ActionTypes.GITHUB_GET_REPOS_REQUEST,
      payload: { q: 'react' },
    }))
      .toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.GITHUB_GET_REPOS_SUCCESS}`, () => {
    expect(reducer.github(undefined, {
      type: ActionTypes.GITHUB_GET_REPOS_SUCCESS,
      payload: {},
    }))
      .toMatchSnapshot();
  });

  it(`should handle ${ActionTypes.GITHUB_GET_REPOS_FAILURE}`, () => {
    expect(reducer.github(undefined, {
      type: ActionTypes.GITHUB_GET_REPOS_FAILURE,
      payload: {},
    }))
      .toMatchSnapshot();
  });
});
