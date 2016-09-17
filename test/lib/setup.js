/*eslint-disable no-console, no-prototype-builtins, no-continue */
const jsdom = require('jsdom');
require('source-map-support').install({
  environment: 'node'
});

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>', { url: 'http://localhost:3000' });
const win = doc.defaultView; // get the window object out of the document

global.document = doc;
global.window = win;
global.window.matchMedia = () => ({ matches: true });
global.navigator = { userAgent: 'node.js' };
global.FormData = window.FormData;
global.window.localStorage = window.sessionStorage = {
  getItem(key) {
    return this[key];
  },
  setItem(key, value) {
    this[key] = value;
  },
  clear() {
    return this;
  }
};

/**
 * Convert data-attr into key data-foo-bar -> fooBar
 *
 * @param {string} val
 * @returns {string}
 */
function _attrToDataKey(val) {
  const out = val.substr(5);
  return out.split('-').map((part, inx) => {
    if (!inx) {
      return part;
    }
    return part.charAt(0).toUpperCase() + part.substr(1);
  }).join('');
}

/**
 * Produce dataset object emulating behavior of el.dataset
 *
 * @param {Element} el
 * @returns {Object}
 */
function _getNodeDataAttrs(el) {
  const atts = el.attributes;
  const len = atts.length;
  const _datasetMap = [];
  // represents el.dataset
  const proxy = {};

  for (let i = 0; i < len; i++) {
    const attr = atts[i].nodeName;

    if (attr.indexOf('data-') === 0) {
      const datakey = _attrToDataKey(attr);
      if (typeof _datasetMap[datakey] !== 'undefined') {
        break;
      }
      _datasetMap[datakey] = atts[i].nodeValue;
      (function(data) { //eslint-disable-line no-loop-func, func-names
        // every data-attr found on the element makes a getter and setter
        Object.defineProperty(proxy, data, {
          enumerable: true,
          configurable: true,
          get: () => _datasetMap[data],
          set: val => {
            _datasetMap[datakey] = val;
            el.setAttribute(attr, val);
          }
        });
      }(datakey));
    }
  }
  return proxy;
}

Object.defineProperty(global.window.Element.prototype, 'dataset', {
  get: () => _getNodeDataAttrs(this)
});

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) {
      continue;
    }
    if (key in global) {
      continue;
    }

    global[key] = window[key];
  }
}

propagateToGlobal(win);
