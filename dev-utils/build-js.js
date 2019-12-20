const rollup = require('rollup');
const path = require('path');
const resolve = require("rollup-plugin-node-resolve");
const replace = require("rollup-plugin-replace");
const commonjs = require("rollup-plugin-commonjs");
const svelte = require("rollup-plugin-svelte");
const { terser } = require("rollup-plugin-terser");
const json = require("rollup-plugin-json");
const stimulus = require("rollup-plugin-stimulus")

const mode = process.env.NODE_ENV;
const dev = mode === "development";

const onwarn = (warning, onwarn) => onwarn(warning);
const dedupe = importee =>
  importee === "svelte" || importee.startsWith("svelte/");


const inputOptions = {
  input: [path.resolve(__dirname, "../src/components.js"), path.resolve(__dirname, "../src/stimulus.js")],
  plugins: [
    json(),
    replace({
      "process.browser": true,
      "process.env.NODE_ENV": JSON.stringify(mode)
    }),
    svelte({
      dev,
      emitCss: true
    }),
    stimulus(),
    resolve({
      browser: true,
      dedupe
    }),
    commonjs(),

    !dev &&
      terser({
        module: true
      })
  ],
  onwarn};
const outputOptions = {
  dir: path.resolve(__dirname, "../js"),
  format: "es",
  sourcemap: true
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code
  await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
}

module.exports = build