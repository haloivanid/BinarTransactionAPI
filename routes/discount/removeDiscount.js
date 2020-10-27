const express = require("express");
const removeData = require("../../controllers/removeController");
const app = express.Router();
const auth = require('../middlewares/jwtMiddleware')
// const authorization = require('../../middleware/authorizationMiddleware')

// app.use(authorization)
app.delete("/discount", auth.verifyJwt(['admin']), (req, res) => {
    const id = req.query.id;
    const query = req.query;
    if (id) {
        removeData.removeDataById("discount", id);
    }
    if (query) {
        removeData.removeDataByQuery("discount", query);
    } else {
        res.status(400).send("bad request");
    }
    res.send("ok");
});

module.exports = app;