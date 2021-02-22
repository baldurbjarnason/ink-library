const path = require("path");
const svelte = require("svelte/compiler");
// const {nodeResolvePlugin} = require("'@web/dev-server")

const sveltePlugin = {
  name: "svelte-plugin",
  resolveMimeType(context) {
    const fileExtension = path.posix.extname(context.path);
    if (fileExtension === ".svelte") {
      return "js";
    }
  },
  async resolveImport({ source, context }) {
    if (
      source === "/node_modules/svelte" ||
      source === "/node_modules/svelte/internal"
    ) {
      return source + "/index.mjs";
    }
  },
  async serverStart({ config, logger }) {
    this.config = config;
    this.logger = logger;
    console.log(config);
  },
  async transform(context) {
    const fileExtension = path.posix.extname(context.path);
    if (fileExtension === ".svelte") {
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
          this.logger.warn(
            `[@web/test-runner-svelte] Warning : ${warning.toString()}`
          );
        }
      }
      return result.js.code + `\n//# sourceMappingURL=` + result.js.map.toUrl();
    }
  },
};

module.exports = {
  sveltePlugin: () => sveltePlugin,
};
