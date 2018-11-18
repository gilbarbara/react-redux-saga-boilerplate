/*eslint-disable func-names, prefer-arrow-callback, no-console */
const path = require('path');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const paths = require('./paths');
const config = require('./webpack.config.dev');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function(proxy, allowedHost) {
  // noinspection WebpackConfigHighlighting
  return {
    clientLogLevel: 'none',
    compress: true,
    contentBase: paths.assets,
    disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    historyApiFallback: {
      disableDotRule: true,
    },
    host,
    hot: true,
    https: protocol === 'https',
    noInfo: true,
    overlay: false,
    proxy,
    public: allowedHost,
    publicPath: config.output.publicPath,
    quiet: false,
    stats: { colors: true },
    watchOptions: {
      ignored: new RegExp(
        `^(?!${path
          .normalize(`${paths.appScripts}/`)
          .replace(/[\\]+/g, '\\\\')}).+[\\\\/]node_modules[\\\\/]`,
        'g'
      ),
    },
    watchContentBase: true,
    before(app, server) {
      app.use(evalSourceMapMiddleware(server));
      app.use(errorOverlayMiddleware());
    },
  };
};
