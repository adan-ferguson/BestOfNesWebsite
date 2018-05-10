const fs = require('fs')
const path = require('path')
const directories = require('../directories.js')

function cleanupDirectories(){

  Object.values(directories.COMPILED).forEach(dir => cleanup(dir))

  function cleanup(dir){

    let files
    try {
      files = fs.readdirSync(dir)
    }catch(e){
      // Probably doesn't exist, move on
      return
    }

    files.forEach(f => {
      let file = path.join(dir, f)
      if(fs.lstatSync(file).isDirectory()){
        cleanup(file)
        fs.rmdirSync(file)
      }else{
        fs.unlinkSync(file)
      }
    })
  }
}

module.exports = cleanupDirectories