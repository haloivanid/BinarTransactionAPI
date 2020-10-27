const express = require("express");
const editData = require('../../controllers/editController')
const auth = require('../middlewares/jwtMiddleware')
const app = express.Router();

// app.use(auth)
app.patch("/items", auth.verifyJwt(['admin']), (req, res) => {
    const body = req.body
    const result = editData("items", body.id, body)
    res.send(result)
})

module.exports = app;