const app = require('./')
const tinylr = require('tiny-lr');
const sirv = require('sirv');
const compress = require('compression')();
const gaze = require('gaze');
const buildCSS = require('./dev-utils/build-css')
const watchJS = require('./dev-utils/watch-js')
 
const js = sirv('js', {
  maxAge: 31536000, 
  immutable: true
});
const css = sirv('css', {
  maxAge: 31536000, 
  immutable: true
});

const lrserver = tinylr()


app
  .use(compress)
  .use('/js', js)
  .use('/css', css)

const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

async function setup () {
  console.log('setting up dev server...')
  gaze(['styles/**/*.css'], function (err, watcher) {
    if (err) console.error(err)
    this.on('all', function(event, filepath) {
      buildCSS()
    });
  })
  gaze(['js/**/*.js', 'css/**/*.css', '**/*.html'], function (err, watcher) {
    if (err) console.error(err)
    this.on('all', function(event, filepath) {
      lrserver.changed(true)
    });
  })
  watchJS()
  app.listen(3000)
}

setup().then(done => {
  console.log('server is listening on port 3000')
  console.log('waiting on changes')
})

