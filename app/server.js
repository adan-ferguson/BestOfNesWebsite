const log = require('fancy-log')
const express = require('express')
const app = express()
  .set('view engine', 'pug')
  .set('views', './web/views')

const config = require('./config.js')

require('./routes.js').apply(app)

app.listen(config.port, () => log(`Listening on port ${config.port}.`))