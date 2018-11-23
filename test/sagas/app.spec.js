import { expectSaga } from 'redux-saga-test-plan';
import { combineReducers } from 'redux';
import rootReducer from 'reducers';

import app, { switchMenu } from 'sagas/app';
import { ActionTypes } from 'constants/index';

describe('app', () => {
  it('should have the expected watchers', done =>
    expectSaga(app)
      .run({ silenceTimeout: true })
      .then(saga => {
        expect(saga).toMatchSnapshot();
        done();
      }));

  it('should have the switch menu saga', () =>
    expectSaga(switchMenu, { payload: { query: 'react' } })
      .withReducer(combineReducers({ ...rootReducer }))
      .put({
        type: ActionTypes.GITHUB_GET_REPOS,
        payload: { query: 'react' },
      })
      .run());
});
