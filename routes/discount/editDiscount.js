const express = require("express");
const editData = require("../../controllers/editController");
const auth = require('../../middlewares/jwtMiddleware')
const app = express.Router();
// const authorization = require('../../middleware/authorizationMiddleware')

// app.use(authorization)
app.patch("/discount", auth.verifyJwt(['admin']), (req, res) => {
    const body = req.body;
    const id = req.query.id;
    const result = editData("discount", id, body);
    res.send(result);
});

module.exports = app;