import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import json from "rollup-plugin-json";

const mode = process.env.NODE_ENV;
const dev = mode === "development";

const onwarn = (warning, onwarn) => onwarn(warning);
const dedupe = importee =>
  importee === "svelte" || importee.startsWith("svelte/");

export default {
  input: ["src/components.js", "src/stimulus.js"],
  output: {
    dir: "js",
    format: "es",
    sourcemap: true
  },
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
  onwarn
};
