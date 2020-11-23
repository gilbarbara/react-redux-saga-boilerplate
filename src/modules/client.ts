/**
 * Client
 * @module Client
 */
import { PlainObject } from 'types';

interface RequestOptions {
  body?: any;
  headers?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

interface RequestError extends Error {
  status: number;
  response: any;
}

export function parseError(error: string): string {
  return error || 'Something went wrong';
}

/**
 * Fetch data
 *
 * @param {string} url
 * @param {Object} options
 * @param {string} [options.method] - Request method ( GET, POST, PUT, ... ).
 * @param {string} [options.payload] - Request body.
 * @param {Object} [options.headers]
 *
 * @returns {Promise}
 */
export function request(url: string, options: RequestOptions = {}): Promise<any> {
  const { body, headers, method }: RequestOptions = {
    method: 'GET',
    ...options,
  };

  const errors: string[] = [];

  if (!url) {
    errors.push('url');
  }

  if (!body && !['GET', 'DELETE'].includes(method)) {
    errors.push('payload');
  }

  if (errors.length) {
    throw new Error(`Error! You must pass \`${errors.join('`, `')}\``);
  }

  const params: RequestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    method,
  };

  if (method !== 'GET') {
    params.body = JSON.stringify(body);
  }

  return fetch(url, params).then(async response => {
    const text = await response.text();
    let content: string | PlainObject;

    try {
      content = JSON.parse(text);
    } catch {
      content = text;
    }

    if (response.status > 299) {
      const error = new Error(response.statusText) as RequestError;
      error.status = response.status;
      error.response = content;

      throw error;
    } else {
      return content;
    }
  });
}
