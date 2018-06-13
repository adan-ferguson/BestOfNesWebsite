const exec = require('child_process').exec
const log = require('fancy-log')

module.exports = () => {
  const cmd = 'forever start ./app/server.js'
  log(cmd)
  exec(cmd)
}