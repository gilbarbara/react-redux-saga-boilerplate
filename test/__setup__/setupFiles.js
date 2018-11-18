import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'polyfills';
import './shim';
import './withContext';

Enzyme.configure({ adapter: new Adapter() });

global.fetch = require('jest-fetch-mock');

global.fetchInit = {
  headers: {
    'content-type': 'application/json',
  },
};

process.env.PUBLIC_URL = '';

const react = document.createElement('div');
react.id = 'react';
react.style.height = '100vh';
document.body.appendChild(react);

global.mount = mount;
global.shallow = shallow;
global.render = render;

global.getSaga = (sagas, action) => sagas
  .filter(d => d.FORK.args[0] === action)
  .map(d => d.FORK.args[1])
  .reduce((acc, d) => d);

global.navigate = (options) => {
  const { pathname = location.pathname, search, hash } = options;
  let url = `${location.protocol}//${location.host}${pathname}`;

  if (search) {
    url += `?${search}`;
  }

  if (hash) {
    url += `#${hash}`;
  }

  jsdom.reconfigure({ url });
};

const consoleError = console.error;
console.error = jest.fn(message => {
  const skipMessages = [
    'Warning: <%s /> is using incorrect casing.',
    'The tag <%s> is unrecognized in this browser.',
    'Warning: Failed prop type',
    'Invalid transition: rotate',
  ];
  let shouldSkip = false;

  for (const s of skipMessages) {
    if (message.includes(s)) {
      shouldSkip = true;
    }
  }

  if (!shouldSkip) {
    consoleError(message);
  }
});
