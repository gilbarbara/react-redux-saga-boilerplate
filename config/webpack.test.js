/*eslint-disable no-var, func-names, prefer-arrow-callback, object-shorthand, no-console, prefer-template, vars-on-top */
var webpack = require('webpack');
var merge = require('webpack-merge');
var nodeExternals = require('webpack-node-externals');
var webpackConfig = require('./webpack.config');

var config = merge.smart(webpackConfig, {
  devtool: 'cheap-module-source-map',
  externals: [nodeExternals()],
  target: 'node',
  output: {
    // sourcemap support for IntelliJ/Webstorm
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'css/locals?modules&importLoaders=1' +
          '&localIdentName=[path][local]__[hash:base64:5]',
          'sass'
        ]
      }
    ]
  }
});

module.exports = config;
