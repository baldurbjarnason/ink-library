const app = require('./')
const tinylr = require('tiny-lr');
const sirv = require('sirv');
const compress = require('compression')();
const gaze = require('gaze');
const buildCSS = require('./dev-utils/build-css');
const watchJS = require('./dev-utils/watch-js');
const express = require('express')
const router = express.Router()

// Need a way to get mocks into the renderer

function render (template) {
  return function (req, res) {
    return res.render(template, {req})
  }
}

// Edit workspace and delete should be client side modes.

// List/Square and sorting are query properties.

// Library fake data - all workspaces
router.get('/library', render('library.html'))
// Library fake data - in a workspace
router.get('/library/:workspace', render('library.html'))
// Library fake data - in a workspace - search in query param
router.get('/library/:workspace/search', render('library.html'))
// Fake user, fake library, fake workspace
router.get('/library/new', render('library-publication-new.html'))
router.get('/library/:workspace/new', render('library-publication-new.html'))
// Fake publication
router.get('/library/:workspace/:id', render('library-publication.html'))
// Empty user
router.get('/login', render('login.html'))
// Fake user
router.get('/logout', render('logout.html'))
// Fake user
router.get('/profile', render('profile.html'))
// Fake user
router.get('/settings', render('settings.html'))
router.get('/', render('front.html'))
 
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
  .use(router)
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

