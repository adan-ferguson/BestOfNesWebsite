const express = require('express')
const router = express.Router()
const races = require('../models/races.js')
const users = require('../models/users.js')
const marathons = require('../models/marathons.js')
const twitch = require('../twitch.js')

router.get('/', (req, res) => {
  res.render('homepage', {title: 'Homepage'})
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get('/marathons', (req, res) => {

  res.render('marathons', {
    title: 'Marathons',
    pastMarathons: marathons.getPast()
  })
})

router.get('/races', async (req, res) => {
  res.render('races', {
    title: 'Races',
    races: await races.list({public: {$eq: true}})
  })
})

router.get('/races/:id/signup', async (req, res) => {

  if(!req.session.username){
    return res.redirect('/')
  }

  await races.addParticipant(req.params.id, req.session.username)
  res.redirect('/races/' + req.params.id)
})

router.get('/races/:id', async (req, res) => {

  let race = await races.get(req.params.id)

  if(!race || (!race.public && !users.isAdmin(req.session.username))){
    return res.redirect('/races')
  }

  races.isParticipant(race, req.session.username)

  let liveParticipants = await twitch.getStreamStatuses(race.participants.map(p => p.username))
  let searchObj = {}
  liveParticipants.forEach(p => searchObj[p.toLowerCase()] = true)

  race.participants.filter(p => searchObj[p.username.toLowerCase()]).forEach(p => p.live = true)

  res.render('race', {
    title: race.name,
    id: req.params.id,
    race: race,
    signupsOpen: races.areSignupsOpen(race),
    finished: race.finished,
    signedUp: races.isParticipant(race, req.session.username)
  })
})

router.get('/twitchredirect', (req, res) => {
  res.render('twitchredirect')
})

router.post('/checkAccessToken', async (req, res) => {

  let username = await twitch.getUsernameFromAccessToken(req.headers['access-token'])
  if(username){
    req.session.username = username
  }

  res.send(twitch.getTwitchInfo(req.session.username))
})

module.exports = router