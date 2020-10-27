const express = require('express')
const getData = require('../../../controllers/getController')
const auth = require('../../../middlewares/jwtMiddleware')
const shapeObject = require('../../../helpers/shapeObjectHelper')

const app = express.Router()

app.get('/user', auth.verifyJwt(['admin', "customer"]), (req, res) => {
  //untuk mengecek key yang dimasukkan didalam query
  let keys = ['username']
  const cekKey = shapeObject(req.query, keys)
  if (!cekKey) {
    return res.status(400).send('bad request cuy')
  }
  //Cek availability of user in database
  const isUserAvailable = getData('customer', req.query)
  if (!isUserAvailable.length) { return res.status(404).send('username is not found') }

  const body = req.query
  if (!body) { return res.status(400).send('please input username') }
  const result = getData('customer', body)
  if (result) {
    res.send(result)
  } else {
    res.status(400).send('Bad request')
  }
})

module.exports = app