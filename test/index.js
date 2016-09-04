import 'core-js/es6/promise';
import 'isomorphic-fetch';

process.env.NODE_ENV = 'test';

const testsContext = require.context('./', false, /^\.\/.*\.spec\.js$/);
testsContext.keys().forEach(testsContext);

const componentsContext = require.context('../app/scripts/', true, /^\.\/(?!vendor).*\.jsx?$/);
componentsContext.keys().forEach(componentsContext);
