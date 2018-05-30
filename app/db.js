const MongoClient = require('mongodb').MongoClient
const config = require('./config.js')

const db = {}

MongoClient.connect(`mongodb://localhost:${config.db.port}/${config.db.name}`, function(err, db) {
  if (err) {
    throw err
  }
  db.close()
})

module.exports = db