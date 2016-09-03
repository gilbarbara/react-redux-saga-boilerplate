/*eslint-disable no-var, func-names, prefer-arrow-callback, object-shorthand, no-console, prefer-template, vars-on-top */
var config = require('./webpack.config');
var nodeExternals = require('webpack-node-externals');

delete config.entry;

config.devtool = 'cheap-module-source-map';
config.externals = [nodeExternals()];
config.target = 'node';
config.output = {
  // sourcemap support for IntelliJ/Webstorm
  devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
};
/* config.module.loaders.push({
  test: /\.scss$/,
  loaders: [
    'css/locals?modules&importLoaders=1' +
    '&localIdentName=[path][local]__[hash:base64:5]',
    'sass'
  ]
});*/

module.exports = config;
