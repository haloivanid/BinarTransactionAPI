const express = require("express");
const removeData = require("../../controllers/removeController");
const app = express.Router();
const auth = require('../middlewares/jwtMiddleware')

// app.use(auth)
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