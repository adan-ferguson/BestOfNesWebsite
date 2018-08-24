const express = require('express')
const router = express.Router()
const config = require('../config.js')
const races = require('../models/races.js')

router.use((req, res, next) => {

  let user = req.session.username

  if(!user || config.accounts.admins.indexOf(user) === -1){
    if(req.method === 'GET'){
      res.redirect('/')
    }else{
      res.sendStatus(403)
    }
  }else{
    next()
  }
})

router.get('/', async (req, res) => {
  return res.render('admin/dashboard', {
    title: 'Admin Dashboard',
    races: await races.list()
  })
})

router.delete('/races/:id', async (req, res) => {
  let success = await races.delete(req.params.id)
  res.sendStatus(success ? 200 : 400)
})

router.get('/races/:id', async (req, res) => {

  let race
  if(req.params.id === 'new'){
    race = races.new()
  }else{
    race = await races.get(req.params.id)
  }

  if(!race){
    return res.send(404)
  }

  return res.render('admin/race', {
    title: 'Admin - Edit Race',
    race: race
  })
})

router.put('/races/:id', async (req, res) => {
  let race = JSON.parse(req.headers.race)
  await races.save(race)
  res.send({
    redirectTo: '/admin/races/' + race._id
  })
})

module.exports = router