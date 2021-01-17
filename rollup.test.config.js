import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import config from "sapper/config/rollup.js";
import pkg from "./package.json";
import json from "rollup-plugin-json";
import autoPreprocess from "svelte-preprocess";
import typescript from '@rollup/plugin-typescript';
import globby from 'globby';

const mode = process.env.NODE_ENV;


export default {
  input: globby.sync("test/components/**/*.svelte"),
  output: {
    dir: "test/components",
    format: "esm",
    sourcemap: true,
    chunkFileNames: "chunks/[name]-[hash].js"
  },
  plugins: [
    json(),
    replace({
      "process.browser": true,
      "process.env.NODE_ENV": JSON.stringify(mode)
    }),
    svelte({
      emitCss: false,
      compilerOptions: {
        dev: true,

        // ensure that extra attributes are added to head
        // elements for hydration (used with generate: 'ssr')
        hydratable: false,

        // You can optionally set 'customElement' to 'true' to compile
        // your components to custom elements (aka web elements)
        customElement: false
      },
      preprocess: autoPreprocess({
        postcss: true
      })
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    typescript({ sourceMap: true })
  ],

  // preserveEntrySignatures: false
}