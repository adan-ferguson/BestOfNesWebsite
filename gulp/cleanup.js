const fs = require('fs')
const path = require('path')
const directories = require('../app/directories.js')

function cleanupDirectories(){

  cleanup(directories.COMPILED_ASSETS)
  cleanup(directories.COMPILED_VIEWS)

  function cleanup(dir){

    let [err, files] = fs.readdirSync(dir)

    if(err){
      throw err
    }

    files.forEach(f => {
      let file = path.join(dir, f)
      fs.lstatSync(file).isDirectory() ? cleanup(file) : fs.unlinkSync(file)
    })
  }
}

module.exports = cleanupDirectories