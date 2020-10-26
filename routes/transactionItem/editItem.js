const express = require('express')
const editData = require('../../controllers/editController')
const app = express.Router()

app.patch('/transaction/item', (req, res) => {
    if (Object.keys(req.body).length == 0) return res.status(400).send('body not allowed')
    if (!req.query.id) return res.status(400).send('id in query needed')
    if (!req.body.itemId) {
        return res.status(400).send('item id in body needed')
    }
    else {
        const { transactionId, itemId, quantity } = req.body
        const transactionItem = {
            transactionId,
            itemId,
            quantity,
            "price": getData('items', { id: itemId }).itemPrice * quantity
        }
        const result = editData('transactionItem', req.query.id, transactionItem)
        res.status(200).send(result)
    }
})

module.exports = app