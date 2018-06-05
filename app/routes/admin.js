const express = require('express')
const router = express.Router()
const twitch = require('../twitch.js')

router.get('/', async (req, res) => {
  await twitch.a()
  res.render('admin/index', {title: 'Admin', message: 'Admin'})
})

module.exports = router