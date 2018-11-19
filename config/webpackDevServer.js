/*eslint-disable func-names, prefer-arrow-callback, no-console */
const path = require('path');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function(proxy, allowedHost) {
  // noinspection WebpackConfigHighlighting
  return {
    clientLogLevel: 'none',
    compress: true,
    contentBase: paths.appAssets,
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
    publicPath: '/',
    quiet: false,
    stats: { colors: true },
    watchOptions: {
      ignored: new RegExp(
        `^(?!${path
          .normalize(`${paths.appSrc}/`)
          .replace(/[\\]+/g, '\\\\')}).+[\\\\/]node_modules[\\\\/]`,
        'g'
      ),
    },
    watchContentBase: true,
    before(app, server) {
      // This lets us fetch source contents from webpack for the error overlay
      app.use(evalSourceMapMiddleware(server));
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());
      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      app.use(noopServiceWorkerMiddleware());
    },
  };
};
