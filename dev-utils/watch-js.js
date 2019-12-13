const rollup = require('rollup');
const path = require('path')


const inputOptions = [path.resolve(__dirname, "../src/components.js"), path.resolve(__dirname, "../src/stimulus.js")];
const outputOptions = {
  dir: path.resolve(__dirname, "../js"),
  format: "es",
  sourcemap: true
};

function watch() {
  const watcher = rollup.watch({input: inputOptions, output: outputOptions});
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