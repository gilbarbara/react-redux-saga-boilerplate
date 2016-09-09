process.env.NODE_ENV = 'test';

const componentsContext = require.context('../app/scripts/', true, /^\.\/(?!vendor).*\.jsx?$/);
componentsContext.keys().forEach(componentsContext);
