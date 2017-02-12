/*eslint-disable no-var, func-names, no-param-reassign prefer-arrow-callback, object-shorthand, no-console, prefer-template, vars-on-top */
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractText = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var autoprefixer = require('autoprefixer');

var webpackConfig = require('./webpack.config');
var NPMPackage = require('./../package');

module.exports = function(env) {
  const target = env ? env.target : 'build';

  return merge.smart(webpackConfig(env), {
    entry: {
      'scripts/app': './scripts/main.jsx',
      'scripts/modernizr': './scripts/vendor/modernizr-custom.js'
    },
    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, '../dist'),
      publicPath: target === 'pages' ? '/react-redux-saga-boilerplate/' : '/',
    },
    devtool: 'source-map',
    plugins: [
      new CleanPlugin(['dist'], { root: path.join(__dirname, '../') }),
      new CopyPlugin([
        { from: '.htaccess' },
        { from: 'robots.txt' },
        { from: '../assets/browserconfig.xml' }
      ]),
      new ExtractText('styles/app.[hash].css'),
      new HtmlPlugin({
        inject: false,
        minify: {
          removeComments: true,
          collapseWhitespace: true
        },
        mobile: true,
        template: './index.ejs',
        title: NPMPackage.title,
        baseHref: target === 'pages' ? '/react-redux-saga-boilerplate' : '',
      }),
      new OfflinePlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          context: '/',
          postcss: function() {
            return {
              defaults: [autoprefixer],
              custom: [
                autoprefixer({
                  browsers: [
                    'ie >= 9',
                    'ie_mob >= 10',
                    'ff >= 30',
                    'chrome >= 34',
                    'safari >= 7',
                    'opera >= 23',
                    'ios >= 7',
                    'android >= 4.4',
                    'bb >= 10'
                  ]
                })
              ]
            };
          }
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      })
    ]
  });
};
