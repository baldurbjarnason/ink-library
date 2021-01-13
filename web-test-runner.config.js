const chromeLauncher = require('@web/test-runner-chrome').chromeLauncher;
require("dotenv").config();

module.exports = {
  browsers: [
    chromeLauncher({
      launchOptions: {
        executablePath: process.env.TEST_BROWSER || null,
      },
    }),
  ],
};