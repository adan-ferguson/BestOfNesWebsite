const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('homepage', {title: 'Homepage'})
})

router.get('/marathons', (req, res) => {
  res.render('marathons', {title: 'Marathons'})
})

router.get('/races', (req, res) => {
  res.render('races', {title: 'Races'})
})

router.get('/twitchredirect', (req, res) => {
  res.render('twitchredirect')
})

module.exports = router