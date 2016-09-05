// @flow

/**
 * Helper functions
 * @module Helpers
 */

import shallowEqual from 'fbjs/lib/shallowEqual';

/**
 * shouldComponentUpdate with context
 *
 * @param {Object} instance
 * @param {Object} nextProps
 * @param {Object} nextState
 * @param {Object} nextContext
 *
 * @returns {boolean}
 */
export function shouldComponentUpdate(instance: Object, nextProps: Object, nextState: Object, nextContext: Object) {
  return !shallowEqual(instance.props, nextProps)
    || !shallowEqual(instance.state, nextState)
    || !shallowEqual(instance.context, nextContext);
}

/**
 * Generate reducer.
 *
 * @param {Object} initialState
 * @param {Object} handlers
 * @returns {function}
 */
export function createReducer(initialState: Object, handlers: Object) {
  return function reducer(state: Object = initialState, action: Object) {
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
export function createRequestTypes(base:String) {
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
export function datasetToObject(elem: Element) {
  const data = {};
  [].forEach.call(elem.attributes, (attr) => {
    /* istanbul ignore else */
    if (/^data-/.test(attr.name)) {
      const camelCaseName = attr.name.substr(5).replace(/-(.)/g, ($0, $1) => $1.toUpperCase());
      data[camelCaseName] = attr.value;
    }
  });
  return data;
}
