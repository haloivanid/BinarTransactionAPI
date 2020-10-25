const express = require('express')
const addData = require('../../controllers/addController')
const uid = require('uid')
const app = express.Router()

app.post('/item', (req, res) => {
  if (Object.keys(req.query).length > 0) return res.status(400).send('query not allowed')
  if (Object.keys(req.body).length == 0) return res.status(400).send('body not allowed')
  if (req.body.id) return res.status(400).send('id in body not allowed')
  //** reserved for add transaction item */
})

module.exports = app