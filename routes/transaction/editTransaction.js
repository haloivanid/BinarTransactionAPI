const express = require('express')
const app = express.Router()
const editData = require('../../controllers/editController')
const getData = require('../../controllers/getController')

//** edit transactions */
app.patch('/transaction', (req, res) => {
    const body = req.body
    const id = body.id
    if (!id) return res.status(400).send('not allowed')
    if (Object.keys(req.body).length == 0) return res.status(400).send('body not allowed')
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