const express = require('express')
const addData = require('../../controllers/addController')
const getData = require('../../controllers/getController')
const auth = require('../../middlewares/jwtMiddleware')
const app = express.Router()

const uid = require('uid')

app.post('/items', auth.verifyJwt(['admin']), (req, res) => {
    const body = req.body
    //** mengecek apakah user tidak memasukkan data dengan body */
    if (Object.keys(body).length == 0) return res.status(400).send('body must inserted')
    //** mengecek apakah user memasukkan string kosong ke dalam body */
    for (const i in body) {
        if (body[i] == "") return res.status(400).send("value of keys in body can't be empty")
    }
    //** check item price format */
    if (String(parseInt(body.itemPrice)) == "NaN") return res.status(404).send('wrong price format')
    body.itemPrice = parseInt(body.itemPrice)
    //** check stock input format */
    if (String(parseInt(body.stock)) == "NaN") return res.status(404).send('wrong stock format')
    body.stock = parseInt(body.stock)
    //** check item with same value exist or not*/
    const isItemExist = getData('items', body)
    if (!isItemExist.length) {
        body.id = uid()
        const result = addData('items', body)
        if (result) {
            res.send(result)
        } else {
            // called if body is didn't match
            res.status(400).send('Bad request')
        }
    } else {
        // called if item already exists
        res.status(409).send('items already exists, please make input for new items')
    }
})

module.exports = app