const express = require('express')
const db = require('../../controllers/addController')
const app = express.Router()
// const authorization = require('../../middleware/authorizationMiddleware')

// app.use(authorization)
app.post('/items', (req, res) => {
    const body = req.body
    body.userId = req.user.id
    const result = db.add('items', body)
    if (!result) {
        res.status(400).send('Wrong body')
    } else {
        res.send(result)
    }
    return
})



module.exports = app