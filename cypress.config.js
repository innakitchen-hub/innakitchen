const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  retries: { runMode: 1, openMode: 0 },
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || "http://localhost:8080",
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",
    specPattern: "cypress/e2e/**/*.cy.js",
  },
});
