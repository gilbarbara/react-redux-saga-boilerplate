/*eslint-disable no-var */
var selenium = require('selenium-server-standalone-jar');
var chromedriver = require('chromedriver');

module.exports = {
  src_folders: ['test/ui'],
  output_folder: 'reports',
  selenium: {
    start_process: true,
    server_path: selenium.path,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path,
      'webdriver.ie.driver': '',
    },
  },
  test_settings: {
    default: {
      launch_url: 'http://localhost:3000',
      selenium_port: 4444,
      selenium_host: 'localhost',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
  },
};
