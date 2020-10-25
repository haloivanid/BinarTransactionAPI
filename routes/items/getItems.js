const express = require('express')
const app = express.Router()
const db = require('../../controllers/getController')
// const authorization = require('../../middleware/authorizationMiddleware')

// app.use(authorization)

app.get('/items', (req, res) => {
    const query = req.query
    const id = req.user.id
    query.userId = id
    const result = db.get('items', query)
    res.send(result)
})

module.exports = app