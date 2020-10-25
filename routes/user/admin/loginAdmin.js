const express = require('express')
const getData = require('../../../controllers/getController')
const { signJwt } = require('../../../middlewares/jwtMiddleware')

const app = express.Router()

app.post('/auth/loginadmin', (req, res) => {
  const body = req.body
  const result = getData('admin', body)
  if (result) {
    const token = signJwt(result[0])
    result[0].accessToken = token
    res.send(result)
  } else {
    res.status(400).send('Bad request')
  }
})

module.exports = app