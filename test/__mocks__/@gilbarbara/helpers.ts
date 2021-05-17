const helpers = jest.requireActual('@gilbarbara/helpers');

module.exports = {
  ...helpers,
  now: () => 1234567890,
};
