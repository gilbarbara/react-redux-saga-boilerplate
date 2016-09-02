if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.prod').default;
}
else {
  module.exports = require('./Root.dev').default;
}
