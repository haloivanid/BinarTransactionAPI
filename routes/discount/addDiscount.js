const express = require('express')
const addData = require('../../controllers/addController')
const getData = require('../../controllers/getController')
const app = express.Router()
// const authorization = require('../../middleware/authorizationMiddleware')

// app.use(authorization)

// uid is a id generator library
// Reference: https://www.npmjs.com/package/uid
const uid = require('uid')

app.post('/discount', (req, res) => {
    const body = req.body
    const isDiscountExist = getData('discount', body)
    if (!isDiscountExist.length) {
        body.id = uid()
        const result = addData('discount', body)
        if (result) {
            res.send(result)
        } else {
            // called if body is didn't match
            res.status(400).send('Bad request')
        }
    } else {
        // called if item already exists
        res.status(409).send('User admin exists, please log in')
    }
})

module.exports = app