const fs = require('fs')
const CONFIG_FILE_PATH = 'config.json'

function readOptions(){
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE_PATH))
  } catch(e) {
    console.log(e)
    return {}
  }
}

const options = readOptions()

const defaults = {
  port: 3000
}

module.exports = Object.assign(defaults, options)