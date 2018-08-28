import { parseError, request, ServerError } from 'modules/client';

describe('client', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  describe('request', () => {
    it('should fail without param', () => {
      expect(() => request()).toThrow('Error! You must pass `url`');
    });

    it('should fail to a POST without payload', () => {
      expect(() => request('http://example.com/token', { method: 'POST' }))
        .toThrow('Error! You must pass `payload`');
    });

    it('should execute a GET successfully', done => {
      fetch.mockResponseOnce(JSON.stringify({ hello: 'world' }), global.fetchInit);

      request('http://example.com/token')
        .then(data => {
          expect(data).toMatchSnapshot();
          done();
        });
    });

    it('should reject for a server error with JSON response', done => {
      fetch.mockRejectOnce(JSON.stringify({ error: 'FAILED' }), global.fetchInit);

      request('http://example.com/token')
        .catch(error => {
          expect(error.response).toMatchSnapshot();
          done();
        });
    });

    it('should reject for a server error with no response', done => {
      fetch.mockRejectOnce(new Error('Failed to Fetch'));

      request('http://example.com/token')
        .catch(error => {
          expect(error.response).toMatchSnapshot();
          done();
        });
    });

    it('should reject for a not found error', done => {
      fetch.mockRejectOnce(JSON.stringify({ error: 'FAILED' }), {
        ...global.fetchInit,
        status: 404,
      });

      request('http://example.com/token')
        .catch(error => {
          expect(error.response).toMatchSnapshot();
          done();
        });
    });

    it('should execute a POST successfully', done => {
      fetch.mockResponseOnce(null, {
        status: 201,
      });

      request('http://example.com/token', { method: 'POST', payload: { a: 1 } })
        .then(data => {
          expect(data).toMatchSnapshot();
          done();
        });
    });
  });

  describe('ServerError', () => {
    it('should create a new instance', () => {
      const error = new ServerError('error');

      expect(error.name).toBe('ServerError');
      expect(error.response).toEqual({});
    });
  });

  describe('parseError', () => {
    it('should handle messages', () => {
      expect(parseError('Failed')).toBe('Failed');
      expect(parseError()).toBe('Something went wrong');
    });
  });
});
