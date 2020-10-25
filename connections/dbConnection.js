const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = lowdb(adapter)

db.defaults({
  // 👇 if your team is adding tables, don't forget to add the table name here, the ifs in the addData() (addController.js) and in editData() (editController.js)
  customer: [],
  admin: [],
  discount: [],
  items: []
})
  .write()

module.exports = db