import expect from 'expect';
import fetchMock from 'fetch-mock';
import { request } from 'utils/api';

describe('api', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  context('request', () => {
    it('should fail without endpoint', () => {
      fetchMock.mock('http://example.com/token', { hello: 'world' });
      expect(() => {
        request({});
      }).toThrow('Error! You must pass `endpoint`');
    });

    it('should execute a GET successfully', (done) => {
      fetchMock.mock('http://example.com/token', { hello: 'world' });

      request({ endpoint: 'http://example.com/token' })
        .then(data => {
          expect(data).toBe('{"hello":"world"}');
          done();
        });
    });

    it('should reject for a server error', (done) => {
      fetchMock.mock('http://example.com/token', 500, { error: 'world' });

      request({ endpoint: 'http://example.com/token' })
        .catch((e) => {
          expect(e).toEqual({ status: 'FAIL', data: '' });
          done();
        });
    });

    it('should reject for a not found error', (done) => {
      fetchMock.mock('http://example.com/token', 404, { error: 'world' });

      request({ endpoint: 'http://example.com/token' })
        .catch((e) => {
          expect(e).toEqual({ status: 'FAIL', data: '' });
          done();
        });
    });

    it('should execute a POST successfully', (done) => {
      fetchMock.post('http://example.com/token', { hello: 'world' });

      request({ endpoint: 'http://example.com/token', method: 'POST', payload: { a: 1 } })
        .then(data => {
          expect(data).toBe('{"hello":"world"}');
          done();
        });
    });

    it('should fail to a POST without payload', () => {
      expect(() => {
        request({ endpoint: 'http://example.com/token', method: 'POST' });
      }).toThrow('Error! You must pass `payload`');
    });
  });
});
