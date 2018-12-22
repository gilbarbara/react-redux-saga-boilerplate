import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'polyfills';

Enzyme.configure({ adapter: new Adapter() });

process.env.PUBLIC_URL = '';

const react = document.createElement('div');
react.id = 'react';
react.style.height = '100vh';
document.body.appendChild(react);

global.navigate = options => {
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

global.shallow = shallow;
global.mount = mount;
global.render = render;

global.fetch = require('jest-fetch-mock');

global.fetchInit = {
  headers: {
    'content-type': 'application/json',
  },
};

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

global.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
});

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
