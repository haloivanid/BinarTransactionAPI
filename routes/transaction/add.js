const express = require('express')
const app = express.Router()
const path = require('path')
const uid = require('uid')
const addData = require('../../controllers/addController')
const getData = require('../../controllers/getController')

const routesName = path.resolve(__dirname).split('/').pop()

//** add transactions */
app.post(`/${routesName}`, (req, res) => {
    if (Object.keys(req.query).length > 0) return res.status(400).send('query not allowed')
    if (Object.keys(req.body).length == 0) return res.status(400).send('body not allowed')
    const id = uid()
    req.body.id = id
    const isId = getData('transaction', { id })
    console.log(isId);
    if (isId.length == 0) {
        const isAdded = addData('transaction', req.body)
        if (isAdded) {
            res.status(200).send('ok')
        }
        else {
            res.status(400).send('not allowed')
        }
    }
    res.status(400).send('not allowed')
})

module.exports = app