const rollup = require('rollup');
const path = require('path')
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



const inputOptions = [path.resolve(__dirname, "../src/components.js"), path.resolve(__dirname, "../src/stimulus.js")];
const outputOptions = {
  dir: path.resolve(__dirname, "../js"),
  format: "es",
  sourcemap: true
};

function watch() {
  const watcher = rollup.watch({
    input: inputOptions, 
    plugins:  [
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
    onwarn,
    output: outputOptions});
  watcher.on('event', event => {
    switch (event.code) {
      case "START":
        console.log('build starting')
        break;
      case "END":
        console.log('build finished')
        break;
      case "ERROR":
        console.log('build error!')
        break;
      case "FATAL":
        console.log('build failed!')
        break;
      default:
        break;
    }
  });
}

module.exports = watch