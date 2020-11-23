import { parseError, request } from 'modules/client';

const fetchOptions = {
  headers: {
    'content-type': 'application/json',
  },
};

describe('modules/client', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('request', () => {
    it('should fail without param', () => {
      // @ts-ignore
      expect(() => request()).toThrow('Error! You must pass `url`');
    });

    it('should fail to a POST without payload', () => {
      expect(() => request('http://example.com/token', { method: 'POST' })).toThrow(
        'Error! You must pass `payload`',
      );
    });

    it('should handle a GET request', () => {
      fetchMock.mockResponseOnce(JSON.stringify({ hello: 'world' }), fetchOptions);

      return request('http://example.com/token').then(data => {
        expect(data).toMatchSnapshot();
      });
    });

    it('should handle a POST request', () => {
      fetchMock.mockResponseOnce('{}', {
        ...fetchOptions,
        status: 201,
      });

      return request('http://example.com/token', { method: 'POST', body: { a: 1 } }).then(data => {
        expect(data).toMatchSnapshot();
      });
    });

    it('should handle an error', () => {
      fetchMock.mockResponse(JSON.stringify({ message: 'Something went wrong' }), {
        status: 400,
      });

      return request('http://example.com/token').catch(error => {
        expect(error.toString()).toBe('Error: Bad Request');
        expect(error.status).toBe(400);
      });
    });

    it('should handle a server error with JSON response', () => {
      fetchMock.mockResponseOnce(JSON.stringify({ error: 'FAILED' }), fetchOptions);

      return request('http://example.com/token').catch(error => {
        expect(error.response).toMatchSnapshot();
      });
    });

    it('should handle a fetch error', () => {
      fetchMock.mockRejectOnce(new Error('Failed to Fetch'));

      return request('http://example.com/token').catch(error => {
        expect(error).toMatchSnapshot();
      });
    });
  });

  describe('parseError', () => {
    it('should handle messages', () => {
      expect(parseError('Failed')).toBe('Failed');
      // @ts-ignore
      expect(parseError()).toBe('Something went wrong');
    });
  });
});
