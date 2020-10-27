const express = require('express')
const editData = require('../../controllers/editController')
const app = express.Router()
const getData = require('../../controllers/getController')
const auth = require('../middlewares/jwtMiddleware')
const collectTransactionItem = require('../../helpers/collectTransactionItem')

//** get transactions */
app.get('/transaction/collect', auth.verifyJwt(['admin', 'customer']), (req, res) => {
    const id = req.query.id
    const collectedData = collectTransactionItem(id)
    if (req.query) {
        const result = getData('transaction', req.query)[0]
        if (result) {
            result.totalProduct = collectedData.totalProduct
            result.totalPrice = collectedData.totalPrice
            result.amountTransaction = collectedData.totalPrice
            newTransaction = editData('transaction', id, result)
            res.status(200).send(newTransaction)
        }
        else {
            res.status(404).send('not found')
        }
    }
    else {
        res.send(getData('transaction', {}))
    }
})

module.exports = app