const express = require('express')
const getData = require('../../../controllers/getController')
const auth = require('../../../middlewares/jwtMiddleware')
const shapeObject = require('../../../helpers/shapeObjectHelper')

const app = express.Router()

app.get('/user', auth.verifyJwt(['admin', "customer"]), (req, res) => {
  //** get userData from jwt */
  try {
    const { id, username, password } = req.userData
    const result = {
      id,
      username,
      password
    }
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = app