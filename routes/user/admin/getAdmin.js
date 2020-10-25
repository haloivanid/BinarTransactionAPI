const express = require('express')
const getData = require('../../../controllers/getController')
const { verifyJwt } = require('../../../middlewares/jwtMiddleware')
const shapeObject = require('../../../helpers/shapeObjectHelper')

const app = express.Router()

app.get('/admin', verifyJwt, (req, res) => {
  //untuk mengecek key yang dimasukkan didalam query
  let keys = ['username']
  const cekKey = shapeObject(req.query, keys)
  if (!cekKey) {
    return res.status(400).send('bad request, please insert the right format')
  }
  //Cek availability of user in database
  const isUserAvailable = getData('admin', req.query)
  if (!isUserAvailable.length) { return res.status(404).send('username is not found') }

  const body = req.query
  const result = getData('admin', body)
  if (result) {
    res.send(result)
  } else {
    res.status(400).send('Bad request')
  }
})

module.exports = app