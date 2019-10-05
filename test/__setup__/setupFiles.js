import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'polyfills';

Enzyme.configure({ adapter: new Adapter() });

process.env.PUBLIC_URL = '';

const root = document.createElement('div');
root.id = 'root';
root.style.height = '100vh';
document.body.appendChild(root);

process.on('uncaughtException', err => {
  console.error(`${new Date().toUTCString()} uncaughtException:`, err.message);
  console.error(err.stack);
});

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
console.error = jest.fn(error => {
  const message = error instanceof Error ? error.message : error;
  const skipMessages = [
    'Warning: <%s /> is using incorrect casing.',
    'The tag <%s> is unrecognized in this browser.',
    // 'Warning: Failed prop type',
    '`transition` of value `rotate`',
    'Invalid transition: rotate',
    "Content type isn't valid:",
  ];
  let shouldSkip = false;

  for (const s of skipMessages) {
    if (message.includes(s)) {
      shouldSkip = true;
    }
  }

  if (!shouldSkip) {
    consoleError(error);
  }
});
