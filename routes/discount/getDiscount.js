const express = require('express')
const app = express.Router()
const getData = require('../../controllers/getController')
const auth = require('../middlewares/jwtMiddleware')

// app.use(auth)
app.get('/discount', auth.verifyJwt(['admin', 'customer']), (req, res) => {
    const id = req.query
    const result = getData('discount', id)
    if (result) {
        res.send(result)
    } else {
        res.status(400).send('Bad request')
    }
})

module.exports = app