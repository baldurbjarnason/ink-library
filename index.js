const express = require('express')
const session = require('express-session');

const app = express();
const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

app.use(session({
  secret: process.env.COOKIE_KEY || 'random_key',
  resave: true,
  rolling: true,
  saveUninitialized: false,
  name: "__session",
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: !dev, name: "__session", httpOnly: true, sameSite: 'lax' }
}))

module.exports = app