//this is a login route for user and admin
const express = require('express')
const getData = require('../../controllers/getController')
const { signJwt } = require('../../middlewares/jwtMiddleware')

const app = express.Router()

app.post('/auth/login', (req, res) => {
  const body = req.body
  // untuk mengecek value username dan password agar tidak kosong
  if (body.password == "" || body.username == "") { return res.status(400).send('please input username and password') }
  // untuk mengecek apakah username sudah terdaftar atau belum
  const isExistsInCustomer = getData('customer', { username: req.body.username })
  const isExistsInAdmin = getData('admin', { username: req.body.username })
  if (!isExistsInCustomer.length && !isExistsInAdmin.length) { return res.status(404).send('username is not found') }

  //to get data from tabel cutomer or admin
  const dataInCustomer = getData('customer', body)[0]
  const dataInAdmin = getData('admin', body)[0]

  if (dataInCustomer) {
    const token = signJwt(dataInCustomer)
    dataInCustomer.accessToken = token
    res.send(dataInCustomer)
  } else if (dataInAdmin) {
    const token = signJwt(dataInAdmin)
    dataInAdmin.accessToken = token
    res.send(dataInAdmin)
  } else {
    res.status(400).send('Bad request, input the right username and password')
  }
})

module.exports = app