const express = require('express')
const router = express.Router()
const twitch = require('../twitch.js')
const config = require('../config.js')
const guid = require('uuid/v4')

router.get('/', async (req, res) => {

  let user = req.session.username

  if(!user){

    let id = guid()

    return res.render('admin/login', {
      title: 'Admin Login',
      twitchLoginLink: twitch.getLoginLink(id),
      stateID: id
    })
  }

  if(!userHasAdminCredentials(user)){
    return res.sendStatus(404)
  }

  return res.render('admin/dashboard', {
    title: 'Admin Dashboard'
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

function userHasAdminCredentials(username){

  if(!username){
    return false
  }

  return config.accounts.admins.indexOf(username) > -1
}

module.exports = router