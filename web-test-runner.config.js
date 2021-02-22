const chromeLauncher = require("@web/test-runner-chrome").chromeLauncher;
const { esbuildPlugin } = require("@web/dev-server-esbuild");

require("dotenv").config();

module.exports = {
  coverage: true,
  coverageConfig: {
    report: true,
    exclude: ["node_modules/**/*", "test/utils.js"],
  },
  browsers: [
    chromeLauncher({
      launchOptions: {
        executablePath: process.env.TEST_BROWSER || null,
      },
    }),
  ],
  plugins: [
    esbuildPlugin({
      ts: true,
      json: true,
    }),
  ],
};
