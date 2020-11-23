const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');

const getHttpsConfig = require('./getHttpsConfig');
const paths = require('./paths');

const host = process.env.HOST || '0.0.0.0';
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/sockjs-node'
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = function webpackDevServer(proxy, allowedHost) {
  // noinspection WebpackConfigHighlighting
  return {
    clientLogLevel: 'none',
    compress: true,
    contentBase: paths.appAssets,
    disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    host,
    hot: true,
    https: getHttpsConfig(),
    // Prevent a WS client from getting injected as we're already including
    // `webpackHotDevClient`.
    injectClient: false,
    overlay: false,
    proxy,
    public: allowedHost,
    publicPath: paths.publicUrlOrPath.slice(0, -1),
    quiet: true,
    sockHost,
    sockPath,
    sockPort,
    stats: { colors: true },
    watchOptions: {
      ignored: ignoredFiles(paths.appSrc),
    },
    watchContentBase: true,
    // Use 'ws' instead of 'sockjs-node' on server since we're using native
    // websockets in `webpackHotDevClient`.
    transportMode: 'ws',
    before(app, server) {
      // This lets us fetch source contents from webpack for the error overlay
      app.use(evalSourceMapMiddleware(server));
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());
    },
    after(app) {
      // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
      app.use(redirectServedPath(paths.publicUrlOrPath));

      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    },
  };
};
