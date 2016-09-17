import 'main';
import createRoutes from 'routes';
import { ActionTypes, XHR } from 'constants/index';

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

describe('Routes', () => {
  it('should match the snapshot', () => {
    const routes = createRoutes();
    expect(routes.props.children.length).toMatchSnapshot();
  });
});
