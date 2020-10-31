const express = require("express");
const editData = require('../../controllers/editController')
const auth = require('../../middlewares/jwtMiddleware')
const app = express.Router();

app.patch("/items", auth.verifyJwt(['admin']), (req, res) => {
    const body = req.body
    //** mengecek apakah user tidak memasukkan data dengan body */
    if (Object.keys(body).length == 0) return res.status(400).send('body must inserted')
    //** mengecek apakah user memasukkan string kosong ke dalam body */
    for (const i in body) {
        if (body[i] == "") return res.status(400).send("value of keys in body can't be empty")
    }
    //** mengecek apakah data key id pada body ada */
    if (!body.id) return res.status(400).status('id in body must inserted')
    //** mencoba melakukan edit data */
    const result = editData("items", body.id, body);
    //** mengecek apakah edit data berhasil */
    if (result) {
        res.send(result);
    }
    else {
        return res.status(400).send('something wrong in body')
    }
})

module.exports = app;