const express = require('express')
const editData = require('../../../controllers/editController')
const getData = require('../../../controllers/getController')
const auth = require('../../../middlewares/jwtMiddleware')

const app = express.Router()

app.patch('/admin', auth.verifyJwt(['admin']), (req, res) => {
  const body = req.body
  if (Object.keys(body).length == 0) return res.status(400).send('body not allowed')
  //** mengecek apakah user memasukkan string kosong ke dalam body */
  for (const keys in body) {
    if (body[keys] == "") return res.status(400).send("value of keys in body can't be empty")
  }
  if (!body.password) return res.status(400).status('password needed')
  const userEdit = {
    "username": req.userData.username,
    "password": body.password
  }
  const result = editData('admin', "0", userEdit)
  if (result) {
    return res.status(200).send('data saved, will use for next login')
  } else {
    // called if request body object key is lacking
    res.status(400).send('Bad request')
  }
})

module.exports = app