/* istanbul ignore else */
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  module.exports = require('./Root.prod').default;
} else {
  module.exports = require('./Root.dev').default;
}
