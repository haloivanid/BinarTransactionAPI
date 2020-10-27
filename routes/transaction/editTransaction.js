const express = require('express')
const app = express.Router()
const editData = require('../../controllers/editController')

//** edit transactions */
app.patch('/transaction', (req, res) => {
    const body = req.body
    const id = body.id
    if (!id) return res.status(400).send('not allowed')
    if (Object.keys(req.body).length == 0) return res.status(400).send('body not allowed')
    const editStatus = editData('transaction', id, body)
    if (editStatus) {
        res.status(200).send('ok')
    }
    else {
        res.status(400).send('not allowed')
    }

})

module.exports = app