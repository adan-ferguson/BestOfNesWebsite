const db = require('../db.js')

module.exports = {

  list: async function(){

    let old = await db().collection('races').find({date: {$lt: new Date()}}).sort({date: -1})
    let upcoming = await db().collection('races').find({date: {$lt: new Date()}}).sort({date: -1})

    return {
      upcoming: upcoming,
      old: old
    }
  }
}