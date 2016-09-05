import expect from 'expect';
import fetchMock from 'fetch-mock';
import { request } from 'utils/api';

describe('api', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  context('request', () => {
    it('should fail without endpoint', () => {
      expect(() => {
        request({});
      }).toThrow('Error! You must pass `endpoint`');
    });

    it('should execute a GET successfully with json', (done) => {
      fetchMock.mock('http://example.com/token', {
        status: 200,
        body: { hello: 'world' },
        headers: { 'Content-Type': 'application/json' }
      });

      request({ endpoint: 'http://example.com/token' })
        .then(data => {
          expect(data).toEqual({ hello: 'world' });
          done();
        });
    });

    it('should reject for a server error', (done) => {
      fetchMock.mock('http://example.com/token', {
        body: { error: 'world' },
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });

      request({ endpoint: 'http://example.com/token' })
        .catch((e) => {
          expect(e).toEqual({ status: 'FAIL', data: { error: 'world' } });
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
      fetchMock.post('http://example.com/token', {
        body: 'ok',
        status: 201
      });

      request({ endpoint: 'http://example.com/token', method: 'POST', payload: { a: 1 } })
        .then(data => {
          expect(data).toBe('ok');
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
