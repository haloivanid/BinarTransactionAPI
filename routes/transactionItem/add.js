const express = require('express')
const addData = require('../../controllers/addController')
const getData = require('../../controllers/getController')
const app = express.Router()

const uid = require('uid')

app.post('/transaction/item', (req, res) => {
    
    // body.userId = req.user.id
    const body = req.body
    body.id = uid();
    const result = addData('item',body );

    if (!result) {
      res.status(400).send('Wrong body');
    } else {
      res.send(result);
    }
    return;
  });

module.exports = app