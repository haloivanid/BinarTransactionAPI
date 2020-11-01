const express = require('express')
const addData = require('../../controllers/addController')
const uid = require('uid')
const dateToday = require('../../helpers/dateToday')
const getData = require('../../controllers/getController')
const auth = require('../../middlewares/jwtMiddleware')
const app = express.Router()

app.post('/transaction/item', auth.verifyJwt(['admin', 'customer']), (req, res) => {
  if (Object.keys(req.body).length == 0) return res.status(400).send('body not allowed')
  //** mengecek apakah user memasukkan string kosong ke dalam body */
  for (const keys in req.body) {
    if (req.body[keys] == "") return res.status(400).send("value of keys in body can't be empty")
  }
  const body = req.body
  //** mengecek apakah userId ada atau tidak dan role harus customer*/
  if (!body.userId) return res.status(400).send('userId in body needed')
  const isUserExist = getData('customer', body.userId)[0]
  if (!isUserExist) return res.status(404).send('sorry user not found')
  if (isUserExist.role != 'customer') return res.status(400).send("sorry admin not allowed")
  //** mengecek apakah ada transakasi belum terselesaikan dari userId */
  const getActiveTransaction = getData('transaction', { userId, dateTransaction: dateToday(), paymentStatus: false })[0]
  //** Jika belum tersedia maka akan membuat transaksi baru untuk userId dan mendapatkan idnya*/
  let transactionId
  if (!getActiveTransaction) {
    const bodyStructure = {
      "id": uid(),
      "userId": req.body.userId,
      "dateTransaction": dateToday(),
      "totalProduct": 0,
      "totalPrice": 0,
      "discountId": "",
      "amountTransaction": 0,
      "payment": 0,
      "paymentStatus": false
    }
    addData('transaction', bodyStructure)
    transactionId = bodyStructure.id
  }
  //** jika masih ada transaksi belum terselesaikan maka akan mengambil id*/
  else {
    transactionId = getActiveTransaction.id
  }

  const { itemId, quantity } = req.body
  if (!itemId || !quantity) return res.status(400).send('body format not allowed')
  const isItemIdExist = getData('items', { id: itemId })[0]
  //** mengecek apakah item ada di dalam db */
  if (isItemIdExist) {
    //** jika ada maka data akan disimpan dalam db*/
    const transactionItem = {
      "id": uid(),
      transactionId,
      itemId,
      quantity,
      "price": getData('items', { id: itemId })[0].itemPrice * quantity
    }
    const result = addData('transactionItem', transactionItem)
    res.status(200).send(result)
  }
  //** jika tidak maka akan error */
  else {
    res.status(404).send('id not found')
  }
})

module.exports = app