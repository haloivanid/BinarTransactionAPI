const express = require('express')
const editData = require('../../../controllers/editController')
const getData = require('../../../controllers/getController')
const auth = require('../../../middlewares/jwtMiddleware')

const app = express.Router()

app.patch('/user', auth.verifyJwt(['admin', "customer"]), (req, res) => {
  const body = req.body
  if (Object.keys(body).length == 0) return res.status(400).send('body not allowed')
  //** mengecek apakah user memasukkan string kosong ke dalam body */
  for (const keys in body) {
    if (body[keys] == "") return res.status(400).send("value of keys in body can't be empty")
  }
  if (!body.password || !body.username) return res.status(400).status('or username password needed')
  const isNewUsernameExist = getData('customer', { username: body.username })
  if (isNewUsernameExist.length || body.username == 'admin') return res.status(400).status('Username has been taken write another one')
  const id = req.userData.id
  body.id = id
  const result = editData('customer', id, body)
  if (result) {
    return res.status(200).send('data saved, will use for next login')
  } else {
    // called if request body object key is lacking
    res.status(400).send('Bad request')
  }
})

module.exports = app