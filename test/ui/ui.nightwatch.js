/*eslint-disable no-console, no-var, no-unused-expressions no-console, func-names, prefer-arrow-callback, object-shorthand */
var timer = 2500;
var wait = 1000;

module.exports = {
  after: function(browser) {
    console.log('Closing down...');
    browser.end();
  },

  'should be able to init a session': browser => {
    browser
      .url('http://localhost:3030/')
      .resizeWindow(1280, 800)
      .waitForElementVisible('#react', timer);
  },

  'should be able to see the App UI': browser => {
    browser.assert.elementPresent('.app');
  },

  'should be able to see Home': browser => {
    browser.assert.elementPresent('.app__home');
    browser.assert.elementPresent('.app__logo');
    browser.assert.elementPresent('.btn-primary');
  },

  'should be able to click Login': browser => {
    browser.click('.btn-primary');
  },

  'should have navigated to /private': browser => {
    browser.waitForElementVisible('.app__logged', timer);
    browser.assert.urlContains('/private');

    browser.assert.elementPresent('.app__logout');
    browser.assert.containsText('h1', 'React-Redux-Saga Boilerplate');
    browser.assert.elementPresent('.app__footer');
  },

  'should redirect navigation from / to /private if still logged': browser => {
    browser.click('.app__header__logo');
    browser.pause(wait);
    browser.assert.urlContains('/private');
  },

  'should be able to logout': browser => {
    browser.click('.app__logout');
    browser.pause(wait);
    browser.assert.urlEquals('http://localhost:3030/');
  },

  'should block navigation to /private if not logged': browser => {
    browser.url('http://localhost:3030/private');
    browser.pause(wait);
    browser.assert.urlEquals('http://localhost:3030/');
  }
};
