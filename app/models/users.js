const config = require('../config.js')

const users = {
  isAdmin: function(username){
    return username && config.accounts.admins.indexOf(username) !== -1
  }
}

module.exports = users