const express = require('express')
const editData = require('../../../controllers/editController')
const getData = require('../../../controllers/getController')
const { verifyJwt } = require('../../../middlewares/jwtMiddleware')

const app = express.Router()

app.patch('/user/admin', verifyJwt, (req, res) => {
  const body = req.body
  const isUserExists = getData('admin', { username: req.body.username })
  console.log(isUserExists, "--is user exists")
  if (isUserExists) {
    const id = isUserExists[0].id
    const result = editData('admin', id, body)
    if (result) {
      return res.send(result)
    } else {
      // called if request body object key is lacking
      res.status(400).send('Bad request')
    }
  } else {
    // called if user is already exists
    res.status(404).send('User admin not found')
  }
})

module.exports = app