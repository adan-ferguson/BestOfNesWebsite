const express = require('express')
const router = express.Router()
const twitch = require('../twitch.js')

router.get('/', async (req, res) => {
  res.render('admin/index', {
    title: 'Admin',
    twitchLoginLink: twitch.getLoginLink()
  })
})

router.post('/checkAccessToken', async (req, res) => {
  console.log('checking access token: ', req.headers['access-token'])
  res.send({
    valid: false
  })
})

module.exports = router