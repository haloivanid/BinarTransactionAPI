const express = require('express')
const app = express.Router()
const getData = require('../../controllers/getController')
const auth = require('../../middlewares/jwtMiddleware')

app.get('/items', auth.verifyJwt(['admin', 'customer']), (req, res) => {
    const query = req.query
    const result = getData('items', query)
    if (result) {
        res.send(result)
    } else {
        res.status(400).send('Bad request')
    }
})

module.exports = app