const db = require('../db.js')

module.exports = {

  list: async function(){

    let date = new Date().toISOString()

    let upcoming = await db.conn()
      .collection('races')
      .find({date: {$gte: date}, finished: {$eq: false}})
      .sort({date: -1})
      .toArray()

    let running = await db.conn()
      .collection('races')
      .find({date: {$lt: date}, finished: {$eq: false}})
      .sort({date: -1})
      .toArray()

    let finished = await db.conn()
      .collection('races')
      .find({finished: {$eq: true}})
      .sort({date: -1})
      .toArray()

    return {
      upcoming: upcoming,
      running: running,
      finished: finished
    }
  },

  new: function(){
    return {
      games: [],
      participants: []
    }
  },

  get: async function(idOrSlug = null){
    return await db.conn().collection('races').findOne(orize(idOrSlug))
  },

  save: async function(race){

    let racesCollection = db.conn().collection('races')
    race._id = db.id(race._id)
    race.lastUpdated = new Date().toISOString()
    await racesCollection.save(race)
  },

  delete: async function(idOrSlug){
    let result = await db.conn().collection('races').deleteOne(orize(idOrSlug))
    return result.deletedCount === 1
  }
}

function orize(idOrSlug){

  let query = {$or: []}

  try {
    let id = db.id(idOrSlug)
    query.$or.push({_id: id})
  }catch(e){
    //
  }

  query.$or.push({slug: idOrSlug})
  return query
}