const MongoClient = require('mongodb').MongoClient
const config = require('./config.js')
const log = require('fancy-log')

let db = {
  connection: null
}

async function connect(){
  try {
    let client = await MongoClient.connect(`mongodb://localhost:${config.db.port}`, { useNewUrlParser: true })
    db.connection = client.db(config.db.name)
    log('Connected to DB')
  }catch(e){
    log('Failed to connect to DB, did you run "npm run startdb"?')
  }
}

connect()

module.exports = db