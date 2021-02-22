const path = require("path");
const svelte = require("svelte/compiler");
// const {nodeResolvePlugin} = require("'@web/dev-server")

const sveltePlugin = {
  name: "svelte-plugin",
  resolveMimeType(context) {
    const fileExtension = path.posix.extname(context.path);
    if (fileExtension === ".svelte") {
      console.log("resolving: ", fileExtension);
      return "js";
    }
  },
  async transform(context) {
    if (context.path.includes("svelte")) {
      console.log(context);
      console.log(context.path);
    }
    const fileExtension = path.posix.extname(context.path);
    if (fileExtension === ".svelte") {
      console.log("transforming: ", fileExtension);
      const result = svelte.compile(context.body, {
        filename: path.posix.basename(context.path),
        format: "esm",
        dev: true,
        preserveComments: true,
        preserveWhitespace: true,
        sveltePath: "/node_modules/svelte",
      });
      if (result.warnings) {
        for (const warning of result.warnings) {
          console.warn(
            `[@web/test-runner-svelte] Warning : ${warning.toString()}`
          );
        }
      }
      return result.js.code;
    }
  },
};

module.exports = {
  sveltePlugin: () => sveltePlugin,
};
