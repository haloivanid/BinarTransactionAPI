const express = require('express')
const addData = require('../../controllers/addController')
const getData = require('../../controllers/getController')
const auth = require('../middlewares/jwtMiddleware')
const app = express.Router()
// const authorization = require('../../middleware/authorizationMiddleware')

// app.use(authorization)

// uid is a id generator library
// Reference: https://www.npmjs.com/package/uid
const uid = require('uid')

app.post('/items', auth.verifyJwt(['admin']), (req, res) => {
    const body = req.body
    const isItemExist = getData('items', body)
    if (!isItemExist.length) {
        body.id = uid()
        body.itemPrice = parseInt(body.itemPrice)
        const result = addData('items', body)
        if (result) {
            res.send(result)
        } else {
            // called if body is didn't match
            res.status(400).send('Bad request')
        }
    } else {
        // called if item already exists
        res.status(409).send('items already exists, please make input for new items')
    }
})

module.exports = app