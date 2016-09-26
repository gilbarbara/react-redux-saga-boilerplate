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
  it('should have 3 mounts', () => {
    const routes = createRoutes();
    expect(routes.props.children.length).toBe(3);
  });
});
