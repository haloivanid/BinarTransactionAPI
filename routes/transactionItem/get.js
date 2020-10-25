const express = require('express')
const getData = require('../../controllers/getController')
const app = express.Router()

app.get('/transaction/item', (req, res) => {
    const query = req.query
    // console.log(req.user.id)
    // const id = req.user.id
    // query.userId = id
    const result = getData('item',query)
    // console.log(result)
  res.send(result)
})

module.exports = app