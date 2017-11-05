// @flow
/**
 * Helper functions
 * @module Helpers
 */

/**
 * Generate reducer.
 *
 * @param {Object} initialState
 * @param {Object} handlers
 * @returns {function}
 */
export function createReducer(initialState: Object, handlers: Object): Function {
  return function reducer(state: Object = initialState, action: Object): Object {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

/**
 * Create request types for contants
 * @param {string} base
 * @returns {Object}
 */
export function createRequestTypes(base:string): Object {
  return ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

/**
 * Convert data attributes to Object
 * @param {Element} elem
 * @returns {{}}
 */
export function datasetToObject(elem: Element): Object {
  const data = {};
  [].forEach.call(elem.attributes, attr => {
    /* istanbul ignore else */
    if (/^data-/.test(attr.name)) {
      const camelCaseName = attr.name.substr(5).replace(/-(.)/g, ($0, $1) => $1.toUpperCase());
      data[camelCaseName] = attr.value;
    }
  });
  return data;
}

export class ServerError extends Error {
  response: Object;

  constructor(response: Object, ...params: any): Error {
    super(...params);

    Error.captureStackTrace(this, ServerError);

    this.name = 'ServerError';
    this.response = {};

    return this;
  }
}
