const express = require('express')
const app = express.Router()
const uid = require('uid')
const addData = require('../../controllers/addController')
const auth = require('../middlewares/jwtMiddleware')
const dateToday = require('../../helpers/dateToday')

//** add transactions */
app.post('/transaction', auth.verifyJwt(['admin']), (req, res) => {
    if (Object.keys(req.body).length == 0) return res.status(400).send('body not allowed')
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