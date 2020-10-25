const express = require("express");
const removeData = require("../../controllers/removeController");
const app = express.Router();

app.delete("/items", (req, res) => {
    const id = req.query.id;
    const query = req.query;
    if (id) {
        removeData.removeDataById("items", id);
    }

    if (query) {
        removeData.removeDataByQuery("items", query);
    } else {
        res.status(400).send("bad request");
    }
    res.send("ok");
});

module.exports = app;