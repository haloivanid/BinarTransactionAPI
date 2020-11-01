const express = require('express')
const editData = require('../../controllers/editController')
const auth = require('../../middlewares/jwtMiddleware')
const app = express.Router()

app.patch('/transaction/item', auth.verifyJwt(['admin', "customer"]), (req, res) => {
    if (Object.keys(req.body).length == 0) return res.status(400).send('body not allowed')
    //** mengecek apakah user memasukkan string kosong ke dalam body */
    for (const keys in req.body) {
        if (req.body[keys] == "") return res.status(400).send("value of keys in body can't be empty")
    }
    if (!req.query.id) return res.status(400).send('id in query needed')
    if (!req.body.itemId) {
        return res.status(400).send('item id in body needed')
    }
    else {
        const { userId, transactionId, itemId, quantity } = req.body
        const isUserExits = getData('customer', { id: userId })
        if (!isUserExits.length) return res.status(404).send("user not found")
        const transactionItem = {
            userId,
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