//this is register route for customer
const express = require('express')
const addData = require('../../controllers/addController')
const getData = require('../../controllers/getController')
const app = express.Router()
// uid is a id generator library
// Reference: https://www.npmjs.com/package/uid
const uid = require('uid')

app.post('/auth/register', (req, res) => {
  const body = req.body
  // untuk mengecek value username dan password agar tidak kosong
  if (body.password == "" || body.username == "") { return res.status(400).send('please input username and password') }
  // mengecek apakah user memasukkan kata administrator sebagai username. 
  if (body.username == "admin" || body.username == "administrator") { return res.status(400).send('please input another username') }
  // untuk mengecek apakah username sudah terdaftar atau belum
  const isUserExists = getData('customer', body)
  if (!isUserExists.length) {
    body.id = uid()
    const result = addData('customer', body)
    if (result) {
      res.send(result)
    } else {
      // called if request body object key is lacking
      res.status(400).send('Bad request')
    }
  } else {
    // called if user is already exists
    res.status(409).send('User exists, please log in')
  }
})

module.exports = app