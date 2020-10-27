const express = require('express')
const auth = require('../middlewares/jwtMiddleware')
const app = express.Router()

app.get('/test', auth.verifyJwt(['admin']), (req, res) => {
    res.send("hello world")
})

module.exports = app