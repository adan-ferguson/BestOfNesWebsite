const express = require('express')
const router = express.Router()
const races = require('../models/races.js')

router.get('/', (req, res) => {
  res.render('homepage', {title: 'Homepage'})
})

router.get('/marathons', (req, res) => {
  res.render('marathons', {title: 'Marathons'})
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

module.exports = router