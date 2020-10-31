const express = require("express");
const removeData = require("../../controllers/removeController");
const app = express.Router();
const auth = require('../../middlewares/jwtMiddleware')

app.delete("/discount", auth.verifyJwt(['admin']), (req, res) => {
    const query = req.query;
    if (query) {
        const result = removeData.removeDataByQuery("discount", query);
        if (result) {
            res.status(200).send('data deleted')
        }
        else {
            res.status(404).send('sorry data not found')
        }
    } else {
        res.status(400).send("nothing removed");
    }
    res.send("ok");
});

module.exports = app;