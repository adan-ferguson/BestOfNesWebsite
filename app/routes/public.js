const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {title: 'Hey', message: 'Route message'})
})

module.exports = router