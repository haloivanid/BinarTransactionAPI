const express = require('express')
const addData = require('../../controllers/addController')
const getData = require('../../controllers/getController')
const auth = require('../../middlewares/jwtMiddleware')
const uid = require('uid')
const app = express.Router()

app.post('/discount', auth.verifyJwt(['admin']), (req, res) => {
    const body = req.body
    //** mengecek apakah user tidak memasukkan data dengan body */
    if (Object.keys(body).length == 0) return res.status(400).send('body must inserted')
    //** mengecek apakah user memasukkan string kosong ke dalam body */
    for (const keys in body) {
        if (body[keys] == "") return res.status(400).send("value of keys in body can't be empty")
    }
    //** mendapatkan data pada table discount */
    const isDiscountExist = getData('discount', body)
    //** mengecek apakah data discount dengan value tertentu sudah ada atau belum */
    if (!isDiscountExist.length) {
        body.id = uid()
        const result = addData('discount', body)
        if (result) {
            res.send(result)
        } else {
            // called if body is didn't match
            res.status(400).send('Bad request')
        }
    } else {
        // called if item already exists
        res.status(409).send('discount is already exist, please add new discount')
    }
})

module.exports = app