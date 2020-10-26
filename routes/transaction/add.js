const express = require('express')
const app = express.Router()
const uid = require('uid')
const addData = require('../../controllers/addController')
const getData = require('../../controllers/getController')
const dateToday = require('../../helpers/dateToday')

//** add transactions */
app.post('/transaction', (req, res) => {
    if (Object.keys(req.query).length > 0) return res.status(400).send('query not allowed')
    if (String(Object.keys(req.body)) != "userId") return res.status(400).send('just insert userId to body')
    const bodyStructure = {
        "id": uid(),
        "userId": req.body.userId,
        "dateTransaction": dateToday(),
        "totalProduct": 0,
        "totalPrice": 0,
        "discountId": "",
        "amountTransaction": 0,
        "payment": 0,
        "paymentStatus": false
    }
    const result = addData('transaction', bodyStructure)
    if (result) {
        res.status(200).send(result)
    }
    else {
        res.status(400).send('something bad happend')
    }

})

module.exports = app