const express = require('express')
const getData = require('../../controllers/getController')
const { signJwt } = require('../../middlewares/jwtMiddleware')

const app = express.Router()

app.post('/auth/login', (req, res) => {
  const body = req.body
  const result = getData('user', body)[0]
  if (result) {
    const token = signJwt(result)
    result.accessToken = token
    res.send(result)
  } else {
    res.status(400).send('Bad request')
  }
})

module.exports = app