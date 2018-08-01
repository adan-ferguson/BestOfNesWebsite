const log = require('fancy-log')
const express = require('express')

const directories = require('./directories')
const config = require('./config.js')
const session = require('express-session')
const db = require('./db.js')

const app = express()
  .use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret,
    cookie: {
      secure: config.requireHttps
    }
  }))
  .set('view engine', 'pug')
  .set('views', directories.COMPILED.VIEWS)
  .use('/static', express.static(directories.STATIC))
  .use('/', require('./routes/public.js'))
  .use('/admin', require('./routes/admin.js'))

app.listen(config.port, () => log(`Listening on port ${config.port}.`))