import fetchMock from 'fetch-mock';
import { request } from 'utils/api';

describe('api', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should fail without param', () => {
    expect(() => {
      request();
    }).toThrow('Error! You must pass `endpoint`');
  });

  it('should fail to a POST without payload', () => {
    expect(() => {
      request({ endpoint: 'http://example.com/token', method: 'POST' });
    }).toThrow('Error! You must pass `payload`');
  });

  it('should execute a GET successfully with json', (done) => {
    fetchMock.mock('http://example.com/token', {
      status: 200,
      body: { hello: 'world' },
      headers: { 'Content-Type': 'application/json' }
    });

    request({ endpoint: 'http://example.com/token' })
      .then(data => {
        expect(data).toMatchSnapshot();
        done();
      });
  });

  it('should reject for a server error with JSON response', (done) => {
    fetchMock.mock('http://example.com/token', {
      body: { error: 'FAILED' },
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });

    request({ endpoint: 'http://example.com/token' })
      .catch(error => {
        expect(error).toMatchSnapshot();
        done();
      });
  });

  it('should reject for a server error with no response', (done) => {
    fetchMock.mock('http://example.com/token', {
      status: 500
    });

    request({ endpoint: 'http://example.com/token' })
      .catch(error => {
        expect(error).toMatchSnapshot();
        done();
      });
  });

  it('should reject for a not found error', (done) => {
    fetchMock.mock('http://example.com/token', 404, {
      error: 'FAILED',
      headers: { 'Content-Type': 'application/json' }
    });

    request({ endpoint: 'http://example.com/token' })
      .catch(error => {
        expect(error).toMatchSnapshot();
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
        expect(data).toMatchSnapshot();
        done();
      });
  });
});
