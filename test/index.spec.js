import 'main';
import createRoutes from 'routes';
import { ActionTypes, XHR } from 'constants/index';

describe('Routes', () => {
  it('should match the snapshot', () => {
    expect(createRoutes()).toMatchSnapshot();
  });
});

describe('Constants:ActionTypes', () => {
  it('should match the snapshot', () => {
    expect(ActionTypes).toMatchSnapshot();
  });
});


describe('Constants:XHR', () => {
  it('should match the snapshot', () => {
    expect(XHR).toMatchSnapshot();
  });
});
