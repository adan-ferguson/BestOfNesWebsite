const express = require('express')
const router = express.Router()
const races = require('../models/races.js')
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

router.get('/races', (req, res) => {
  res.render('races', {title: 'Races'})
})

router.get('/races/:id', async (req, res) => {

  let race = await races.get(req.params.id)

  if(!race){
    return res.send(404)
  }

  res.locals.title = 'Race'

  res.render('race', {
    title: 'Race',
    race: race
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