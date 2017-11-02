// @flow
/*eslint-disable no-console, no-var, vars-on-top, func-names */
/**
 * @module Polyfills
 * @desc Add CustomEvent and Dataset for older browsers.
 */

/**
 * CustomEvent Polyfill
 */
/* istanbul ignore next */
(function() {
  if (typeof window.CustomEvent === 'function') {
    return;
  }

  function CustomEvent(event, params) {
    const newParams = params || { bubbles: false, cancelable: false, detail: undefined };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, newParams.bubbles, newParams.cancelable, newParams.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}());

/**
 * Dataset Polyfill
 */
/* istanbul ignore next */
(function() {
  if (!document.documentElement.dataset && (!Object.getOwnPropertyDescriptor(Element.prototype, 'dataset') || !Object.getOwnPropertyDescriptor(Element.prototype, 'dataset').get)) {
    const descriptor = {};

    descriptor.enumerable = true;

    descriptor.get = function() {
      const element = this;
      const map = {};
      const { attributes } = this;

      function toUpperCase(n0) {
        return n0.charAt(1).toUpperCase();
      }

      function getter() {
        return this.value;
      }

      function setter(name, value) {
        if (typeof value !== 'undefined') {
          this.setAttribute(name, value);
        } else {
          this.removeAttribute(name);
        }
      }

      for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];

        // This test really should allow any XML Name without
        // colons (and non-uppercase for XHTML)

        if (attribute && attribute.name && /^data-\w[\w-]*$/.test(attribute.name)) {
          const { name, value } = attribute.name;

          // Change to CamelCase

          const propName = name.substr(5).replace(/-./g, toUpperCase);

          Object.defineProperty(map, propName, {
            enumerable: this.enumerable,
            get: getter.bind({ value: value || '' }),
            set: setter.bind(element, name),
          });
        }
      }
      return map;
    };

    Object.defineProperty(Element.prototype, 'dataset', descriptor);
  }
}());
