import 'isomorphic-fetch';
import nock from 'nock';
import { request } from 'modules/api';

describe('api', () => {
  it('should fail without param', () => {
    expect(() => request()).toThrow('Error! You must pass `url`');
  });

  it('should fail to a POST without payload', () => {
    expect(() => request('http://example.com/token', { method: 'POST' }))
      .toThrow('Error! You must pass `payload`');
  });

  it('should execute a GET successfully', done => {
    nock('http://example.com')
      .get('/token')
      .reply(200, { hello: 'world' });

    request('http://example.com/token')
      .then(data => {
        expect(data).toMatchSnapshot();
        done();
      });
  });

  it('should reject for a server error with JSON response', done => {
    nock('http://example.com')
      .get('/token')
      .reply(500, { error: 'FAILED' });

    request('http://example.com/token')
      .catch(error => {
        expect(error.response).toMatchSnapshot();
        done();
      });
  });

  it('should reject for a server error with no response', done => {
    nock('http://example.com')
      .get('/token')
      .reply(500);

    request('http://example.com/token')
      .catch(error => {
        expect(error.response).toMatchSnapshot();
        done();
      });
  });

  it('should reject for a not found error', done => {
    nock('http://example.com')
      .get('/token')
      .reply(404, {
        error: 'FAILED',
      });

    request('http://example.com/token')
      .catch(error => {
        expect(error.response).toMatchSnapshot();
        done();
      });
  });

  it('should execute a POST successfully', done => {
    nock('http://example.com')
      .post('/token')
      .reply(201);

    request('http://example.com/token', { method: 'POST', payload: { a: 1 } })
      .then(data => {
        expect(data).toMatchSnapshot();
        done();
      });
  });
});
