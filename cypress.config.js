const { defineConfig } = require("cypress");

module.exports = defineConfig({
  downloadsFolder: "cypress/downloads",

  e2e: {
    baseUrl: "https://www.saucedemo.com",
    watchForFileChanges: false,
    chromeWebSecurity: false, //ADDED THIS LINE TO TURN OFF WEBSECURITY
    defaultCommandTimeout: 10000,
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
