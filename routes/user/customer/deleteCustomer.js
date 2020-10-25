const express = require('express')
const { removeDataByQuery } = require('../../../controllers/removeController')
const { verifyJwt } = require('../../../middlewares/jwtMiddleware')
const shapeObject = require('../../../helpers/shapeObjectHelper')

const app = express.Router()

app.delete('/user/customer', verifyJwt, (req, res) => {
  let keys = ['username']
  const cekKey = shapeObject(req.query, keys)
  if (!cekKey) {
    return res.status(400).send('bad request cuy')
  }
  const result = removeDataByQuery('user', req.query)
  if (result) {
    res.send(result)
  } else {
    res.status(400).send('Bad request')
  }
})

module.exports = app