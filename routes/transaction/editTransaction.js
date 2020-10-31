const express = require('express')
const app = express.Router()
const editData = require('../../controllers/editController')
const getData = require('../../controllers/getController')
const auth = require('../../middlewares/jwtMiddleware')

//** edit transactions */
app.patch('/transaction', auth.verifyJwt(['admin']), (req, res) => {
    const body = req.body
    const id = body.id
    if (!id) return res.status(400).send('not allowed')
    if (Object.keys(req.body).length == 0) return res.status(400).send('body not allowed')
    const notEditedKeys = [
        'dateTransaction',
        'totalProduct',
        'totalPrice',
        'amountTransaction',
        'paymentStatus'
    ]
    for (const keys in body) {
        if (notEditedKeys.includes(keys)) return res.status(400).send("keys can't be edited")
    }
    if (body.discountId != "") {
        const discount = getData('discount', { id: body.discountId })[0]
        if (discount == 0) return res.status(404).send('discount not found')
        body.amountTransaction = body.totalPrice - (body.totalPrice * discount.value)
    }
    if (body.payment != "") {
        if (body.payment == body.amountTransaction) {
            body.paymentStatus = true
        }
        else {
            body.paymentStatus = false
        }
    }
    const editStatus = editData('transaction', id, body)
    if (editStatus) {
        res.status(200).send('ok')
    }
    else {
        res.status(400).send('not allowed')
    }

})

module.exports = app