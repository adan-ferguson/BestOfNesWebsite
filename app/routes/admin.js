const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('admin/index', {title: 'Admin', message: 'Admin'})
})

module.exports = router