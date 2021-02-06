const db = require('../db.js')

const races = {

  list: async function(query = {}){

    let date = new Date().toISOString()

    let upcoming = await db.conn()
      .collection('races')
      .find(Object.assign({date: {$gte: date}, finished: {$eq: false}}, query))
      .sort({date: -1})
      .toArray()

    let running = await db.conn()
      .collection('races')
      .find(Object.assign({date: {$lt: date}, finished: {$eq: false}}, query))
      .sort({date: -1})
      .toArray()

    let finished = await db.conn()
      .collection('races')
      .find(Object.assign({finished: {$eq: true}}, query))
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
    race.date = new Date(race.date).toISOString()
    let result = await racesCollection.save(race)
    return result.result.ok === 1
  },

  delete: async function(idOrSlug){
    let result = await db.conn().collection('races').deleteOne(orize(idOrSlug))
    return result.deletedCount === 1
  },

  addParticipant: async function(id, username, streamLink = ('https://twitch.tv/' + username)){

    let race = await races.get(id)
    if(!race.participants) {
      race.participants = []
    }

    if(races.isParticipant(race, username)){
      return false
    }

    race.participants.push({
      username: username,
      streamLink: streamLink
    })
    let result = await db.conn().collection('races').save(race)
    return result.result.ok === 1
  },

  isParticipant: function(race, username){

    if(!username){
      return false
    }

    let u = username.toLowerCase()
    return race.participants.find(p => p.username.toLowerCase() === u.toLowerCase())
  },

  areSignupsOpen: function(race){
    return !race.finished && new Date(race.date) > new Date()
  }
}

module.exports = races

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