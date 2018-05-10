const log = require('fancy-log')
const express = require('express')
const directories = require('./directories')
const app = express()
  .set('view engine', 'pug')
  .set('views', directories.COMPILED.VIEWS)

const config = require('./config.js')

require('./routes.js').apply(app)

app.listen(config.port, () => log(`Listening on port ${config.port}.`))