const esbuildPlugin = require("@web/dev-server-esbuild");

module.exports = {
  open: true,
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      json: true,
    }),
  ],
};
