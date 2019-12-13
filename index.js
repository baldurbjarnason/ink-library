const express = require('express')
const session = require('express-session');
const turbolinks = require('./turbolinks-express')

const app = express();

app.use(session({
  secret: 'random_key',
  resave: false,
  saveUninitialized: true
}))

// turbolinks
app.use(turbolinks.redirect)
app.use(turbolinks.location)

module.exports = app