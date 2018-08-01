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

  new: function(){
    return {
      games: [],
      participants: []
    }
  },

  get: async function(idOrSlug = null){

    let query = {$or: []}

    try {
      let id = db.id(idOrSlug)
      query.$or.push({_id: id})
    }catch(e){
      //
    }

    query.$or.push({slug: idOrSlug})

    return await db.conn().collection('races').findOne(query)
  },

  save: async function(race){

    let racesCollection = db.conn().collection('races')
    race._id = db.id(race._id)
    race.lastUpdated = new Date().toISOString()
    await racesCollection.save(race)
  }
}