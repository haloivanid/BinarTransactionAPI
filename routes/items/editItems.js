const express = require("express");
const editData = require('../../controllers/editController')
const app = express.Router();
// const authorization = require('../../middleware/authorizationMiddleware')

// app.use(authorization)
app.patch("/items", (req, res) => {
    const body = req.body
    const result = editData("items", body.id, body)
    res.send(result)
})

module.exports = app;