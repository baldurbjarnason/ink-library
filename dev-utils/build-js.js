const rollup = require('rollup');
const path = require('path')


const inputOptions = [path.resolve(__dirname, "../src/components.js"), path.resolve(__dirname, "../src/stimulus.js")];
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