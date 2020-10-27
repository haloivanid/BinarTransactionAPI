const express = require('express')
const getData = require('../../controllers/getController')
const auth = require('../middlewares/jwtMiddleware')
const app = express.Router()

app.get('/transaction/item', auth.verifyJwt(['admin', "customer"]), (req, res) => {
  const query = req.query
  // console.log(req.user.id)
  // const id = req.user.id
  // query.userId = id
  const result = getData('transactionItem', query)
  // console.log(result)
  res.send(result)
})

module.exports = app