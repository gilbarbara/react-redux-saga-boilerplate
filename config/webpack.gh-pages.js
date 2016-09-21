/*eslint-disable no-var, func-names, prefer-arrow-callback, object-shorthand, no-console, prefer-template, vars-on-top */
var merge = require('webpack-merge');

var webpackConfig = require('./webpack.prod');

var config = merge.smart(webpackConfig, {
  entry: {
    'scripts/app': './scripts/main.jsx',
    'scripts/modernizr': './scripts/vendor/modernizr-custom.js'
  },
  output: {
    publicPath: '/react-redux-saga-boilerplate'
  }
});

module.exports = config;
