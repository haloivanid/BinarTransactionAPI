const express = require('express')
const app = express.Router()
const getData = require('../../controllers/getController')
// const authorization = require('../../middleware/authorizationMiddleware')

// app.use(authorization)
app.get('/items', (req, res) => {
    const body = req.body
    const result = getData('items', body)
    if (result) {
        res.send(result)
    } else {
        res.status(400).send('Bad request')
    }
})

module.exports = app