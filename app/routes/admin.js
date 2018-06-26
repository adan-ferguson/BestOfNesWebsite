const express = require('express')
const router = express.Router()
const twitch = require('../twitch.js')
const config = require('../config.js')
const guid = require('uuid/v4')
const races = require('../models/races.js')

async function checkCredentials(req, res, next){

  let user = req.session.username

  if(req.method === 'GET' && !user){
    res.redirect('/admin/login')
  }else if(req.method === 'POST' && !user){
    res.send(404)
  }else if(!userHasAdminCredentials(user)){
    res.send(404)
  }else{
    next()
  }
}

function userHasAdminCredentials(username){

  if(!username){
    return false
  }

  return config.accounts.admins.indexOf(username) > -1
}

router.get('/', checkCredentials, async (req, res) => {
  return res.render('admin/dashboard', {
    title: 'Admin Dashboard',
    races: await races.list()
  })
})

router.get('/races/:id', checkCredentials, async (req, res) => {

  let race = await races.get(req.params.id)

  if(!race){
    return res.send(404)
  }

  return res.render('admin/race', {
    title: 'Admin - Edit Race',
    race: race
  })
})

router.get('/login', (req, res) => {

  let id = guid()

  res.render('admin/login', {
    title: 'Admin Login',
    twitchLoginLink: twitch.getLoginLink(id),
    stateID: id
  })
})

router.post('/checkAccessToken', async (req, res) => {

  let username = await twitch.getUsernameFromAccessToken(req.headers['access-token'])
  let valid = userHasAdminCredentials(username)

  if(valid){
    req.session.username = username
  }

  res.send({
    valid: valid
  })
})

module.exports = router