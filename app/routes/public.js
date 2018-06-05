const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {title: 'Hey', message: 'Route message'})
})

router.get('/twitchredirect', (req, res) => {
  res.render('twitchredirect', {title: 'Hey', message: 'Route message'})
})

module.exports = router