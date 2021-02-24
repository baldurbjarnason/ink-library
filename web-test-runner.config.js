const chromeLauncher = require("@web/test-runner-chrome").chromeLauncher;
const { esbuildPlugin } = require("@web/dev-server-esbuild");
const { sveltePlugin } = require("./test/utils/test-runner-svelte.js");

require("dotenv").config();

module.exports = {
  nodeResolve: {
    extensions: [".svelte"],
  },
  coverage: true,
  coverageConfig: {
    report: true,
    exclude: ["node_modules/**/*", "test/**/*"],
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
      target: "auto",
      ts: true,
      json: true,
    }),
    sveltePlugin(),
  ],
};
