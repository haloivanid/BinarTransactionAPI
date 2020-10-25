const express = require('express')
const app = express.Router()
const path = require('path')
const uid = require('uid')
const addData = require('../../controllers/addController')
const editData = require('../../controllers/editController')
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

//** edit transactions */
app.patch(`/${routesName}`, (req, res) => {
    const id = req.query.id
    if (!id) return res.status(400).send('not allowed')
    if (Object.keys(req.body).length == 0) return res.status(400).send('body not allowed')
    req.body.id = id
    const editStatus = editData('transaction', id, req.body)
    if (editStatus) {
        res.status(200).send('ok')
    }
    else {
        res.status(400).send('not allowed')
    }

})

module.exports = app