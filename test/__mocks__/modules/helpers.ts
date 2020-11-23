const helpers = jest.requireActual('../../../src/modules/helpers');

module.exports = {
  ...helpers,
  getUnixtime: () => 1234567890,
};
