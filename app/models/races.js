const db = require('../db.js')

module.exports = {

  list: async function(){

    let old = await db().collection('races').find({date: {$lt: new Date()}}).sort({date: -1}).toArray()
    let upcoming = await db().collection('races').find({date: {$gte: new Date()}}).sort({date: -1}).toArray()

    return {
      upcoming: upcoming,
      old: old
    }
  },

  get: async function(id){

    if(id === 'new'){
      return {
        games: [],
        participants: []
      }
    }else{
      return await db().collection('races').findOne({id: id})
    }
  }
}