const db = require('../db.js')

module.exports = {

  list: async function(){

    let date = new Date().toISOString()

    let old = await db.conn()
      .collection('races')
      .find({date: {$lt: date}})
      .sort({date: -1})
      .toArray()

    let upcoming = await db.conn()
      .collection('races')
      .find({date: {$gte: date}})
      .sort({date: -1})
      .toArray()

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
      return await db.conn().collection('races').findOne(db.id(id))
    }
  },

  save: async function(race){

    let racesCollection = db.conn().collection('races')
    race._id = db.id(race.id)
    await racesCollection.save(race)
  }
}