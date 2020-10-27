const express = require('express')
const auth = require('../../middlewares/jwtMiddleware')
const app = express.Router()

app.get('/user/customer/all', (_, res) => {
    const result = getData('customer', {})
    if (result.length == 0) return res.status(304).send('No customer found, let them register')
    res.status(200).send(result)
})

module.exports = app