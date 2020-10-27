const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = lowdb(adapter)

db.defaults({
  // 👇 if your team is adding tables, don't forget to add the table name here, the ifs in the addData() (addController.js) and in editData() (editController.js)
  admin: [
    {
      "id": "0",
      "username": "admin",
      "password": "admin"
    }
  ],
  customer: [],
  transaction: [],
  transactionItem: [],
  items: [],
  discount: []
})
  .write()

module.exports = db