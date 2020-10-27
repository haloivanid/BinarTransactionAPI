const express = require('express')
const addData = require('../../controllers/addController')
const uid = require('uid')
const getData = require('../../controllers/getController')
const auth = require('../../middlewares/jwtMiddleware')
const app = express.Router()

app.post('/transaction/item', auth.verifyJwt(['admin', 'customer']), (req, res) => {
  if (Object.keys(req.body).length == 0) return res.status(400).send('body not allowed')
  if (req.body.id) return res.status(400).send('id in body not allowed')
  if (!req.body.itemId) {
    return res.status(400).send('item id in body needed')
  }
  else {
    const { transactionId, itemId, quantity } = req.body
    const isItemIdExist = getData('items', { id: itemId })[0]
    if (isItemIdExist) {
      const transactionItem = {
        "id": uid(),
        transactionId,
        itemId,
        quantity,
        "price": getData('items', { id: itemId })[0].itemPrice * quantity
      }
      const result = addData('transactionItem', transactionItem)
      res.status(200).send(result)
    }
    else {
      res.status(404).send('id not found')
    }
  }
})

module.exports = app