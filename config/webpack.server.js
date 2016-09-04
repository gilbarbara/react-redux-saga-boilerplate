/*eslint-disable no-var, one-var, func-names, indent, prefer-arrow-callback, prefer-template, object-shorthand, no-console, newline-per-chained-call, one-var-declaration-per-line, vars-on-top */
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var moment = require('moment');
var WebpackDevServer = require('webpack-dev-server');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var webpackConfig = require('./webpack.config');

function getIPAddress() {
  var interfaces = require('os').networkInterfaces();

  for (var devName in interfaces) {
    if ({}.hasOwnProperty.call(interfaces, devName)) {
      var iface = interfaces[devName];

      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  }

  return '0.0.0.0';
}

var config = merge.smart(webpackConfig, {
  output: {

    filename: '[name].js',
    publicPath: 'http://localhost:3000/'
  },
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:3030',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './scripts/main.jsx'
    ],
    modernizr: './scripts/vendor/modernizr-custom.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
      host: getIPAddress(),
      port: 3000,
      notify: true,
      logPrefix: 'sia',
      proxy: 'http://localhost:3030'
    }, {
      reload: false
    })
  ]
});

var compiler = webpack(config);
var start;

compiler.plugin('compile', function() {
  start = moment();
  console.log(start.format('hh:mm:ss') + ' Bundling...');
});

compiler.plugin('emit', function(compilation, callback) {
  var now = moment();
  console.log('Duration: ' + now.diff(start, 's') + 's');
  console.log('Hash: ' + compilation.hash);

  callback();
});

new WebpackDevServer(compiler, {
  contentBase: path.resolve(__dirname, '../app'),
  noInfo: true,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(3030, 'localhost', function(err) {
  if (err) {
    console.log('err', err);
  }
});
