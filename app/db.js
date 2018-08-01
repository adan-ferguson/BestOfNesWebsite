const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient
const config = require('./config.js')
const log = require('fancy-log')

let connection

async function connect(){
  try {
    let client = await MongoClient.connect(`mongodb://localhost:${config.db.port}`, { useNewUrlParser: true })
    connection = client.db(config.db.name)
    log('Connected to DB')
  }catch(e){
    log('Failed to connect to DB, did you run "npm run startdb"?')
  }
}

connect()

module.exports = {
  conn: () => connection,
  id: id => MongoDB.ObjectID(id)
}