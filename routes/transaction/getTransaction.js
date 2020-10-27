const express = require('express')
const app = express.Router()
const getData = require('../../controllers/getController')

//** get transactions */
app.get('/transaction', (req, res) => {
    if (req.query) {
        const result = getData('transaction', req.query)
        if (result.length != 0) {
            res.send(result)
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