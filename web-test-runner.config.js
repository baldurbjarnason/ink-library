

const chromeLauncher = require('@web/test-runner-chrome').chromeLauncher;

require("dotenv").config();



module.exports = {
  coverage: true,
  coverageConfig: {
    report: true,
    exclude: ["node_modules/**/*"]
  },
  browsers: [
    chromeLauncher({
      launchOptions: {
        executablePath: process.env.TEST_BROWSER || null,
      },
    }),
  ],
};