const express = require('express')
const { removeDataByQuery } = require('../../../controllers/removeController')
const auth = require('../middlewares/jwtMiddleware')
const shapeObject = require('../../../helpers/shapeObjectHelper')

const app = express.Router()

app.delete('/user', auth.verifyJwt(['admin', "customer"]), (req, res) => {
  let keys = ['username']
  const cekKey = shapeObject(req.query, keys)
  if (!cekKey) {
    return res.status(400).send('bad request, please input the right format')
  }
  const result = removeDataByQuery('customer', req.query)
  if (result) {
    res.send(result)
  } else {
    res.status(404).send('username is not found')
  }
})

module.exports = app