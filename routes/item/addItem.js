const express = require('express')
const addData = require('../../controllers/addController')
const app = express.Router()

app.post('/item', (req, res) => {
    
    const data = req.body
    // body.userId = req.user.id
    const result = addData('item', data)
    if (!result) {
        res.status(400).send('Wrong body')
      } else {
        res.send(result)
      }
      return
})

module.exports = app