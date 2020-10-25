const express = require('express')
const editData = require('../../controllers/editController')
// const addData = require('../../controllers/addController')
const app = express.Router()


app.patch('/transaction/item', (req, res) => {
    const body = req.body
    const id = req.body.id
    const result = editData('item',id,body)
    if (!result) {
        res.status(400).send('Bad request');
      } else {
        res.send(result);
      }
      return;
})

module.exports = app