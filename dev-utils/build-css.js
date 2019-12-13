const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const cssnano = require('cssnano')
const properties = require('postcss-custom-properties')
const reporter = require('postcss-reporter')
const easyImport = require('postcss-easy-import')
const calc = require('postcss-calc')
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const production = !dev


function buildCSS () {
  fs.readFile(path.join(__dirname, '../styles/index.css'), (err, css) => {
    if (err) {
      throw err
    }
    postcss([
      easyImport,
      properties(),
      calc(),
      autoprefixer,
      reporter(),
      cssnano({
        preset: 'default'
      })
    ])
      .process(css, {
        from: path.join(__dirname, '../styles/index.css'),
        to: path.join(__dirname, '../css/styles.css'),
        map: { inline: false }
      })
      .then(result => {
        try {
          fs.mkdirSync('css')
        } catch (err) {
          if (err.code !== 'EEXIST') throw err
        }
        return result
      })
      .then(result => {
        const hash = crypto
          .createHash('md5')
          .update(css)
          .digest('hex')
          .substr(0, 16)
        const filename = production ? `static/styles/app.${hash}.css` : `static/styles/app.dev.css`
        fs.writeFile(filename, result.css, () =>
          console.log(filename)
        )
        if (result.map) {
          fs.writeFile(`${filename}.map`, result.map, () =>
            console.log(`${filename}.map`)
          )
        }
      })
  })
}
module.exports = buildCSS
