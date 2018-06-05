const express = require('express')
const router = express.Router()
const twitch = require('../twitch.js')

router.get('/', async (req, res) => {
  res.render('admin/index', {
    title: 'Admin',
    twitchLoginLink: twitch.getLoginLink()
  })
})

module.exports = router