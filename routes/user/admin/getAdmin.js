const express = require('express')
const getData = require('../../../controllers/getController')
const { verifyJwt } = require('../../../middlewares/jwtMiddleware')

const app = express.Router()

app.get('/user/admin', verifyJwt, (req, res) => {
  const body = req.body
  const result = getData('admin', body)
  if (result) {
    res.send(result)
  } else {
    res.status(400).send('Bad request')
  }
})

module.exports = app