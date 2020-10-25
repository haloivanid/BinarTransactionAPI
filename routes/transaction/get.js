const express = require('express')
const app = express.Router()
const path = require('path')
const getData = require('../../controllers/getController')

const routesName = path.resolve(__dirname).split('/').pop()

//** get transactions */
app.get(`/${routesName}`, (req, res) => {
    if (req.query) {
        const result = getData('transaction', req.query)
        if (result.lengt != 0) {
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