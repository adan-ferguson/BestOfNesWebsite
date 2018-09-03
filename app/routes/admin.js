const express = require('express')
const router = express.Router()
const races = require('../models/races.js')
const users = require('../models/users.js')

router.use((req, res, next) => {

  if(!users.isAdmin(req.session.username)){
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
    title: 'Admin - Dashboard',
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
  let race = req.body
  await races.save(race)
  res.send({
    id: race.slug || race._id
  })
})

module.exports = router