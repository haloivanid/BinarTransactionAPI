const db = require("../connections/dbConnection");
const transactionItemModel = require("../models/transactionItemModel");

/**
 * Edit data
 * 
 * Usage example:
 * 
 *    edit('transaction', "1", { nominal: 4000 })
 *    // 👆 edit data by id "1" to having 4000 nominal
 * 
 * @param {String} tableName choose table
 * @param {String} id data id to update
 * @param {Object} data new data to update
 * @returns {Object} Returns an `object` if successfully added
 * @returns {Boolean} Retuns `false` if id wasn't string, not found, or data object keys was lacking
 */
function editData(tableName, id, data) {
  if (!id) return false
  if (typeof id !== 'string') return false
  const searchResult = db.get(tableName)
    .find({ id })
    .value()
  if (searchResult) {
    let shapedData;
    data.id = id
    if (tableName == 'transaction') {
      shapedData = shapeObject(data, transactionModel)
    }
    if (tableName == 'user') {
      shapedData = shapeObject(data, userModel)
    }
    if (tableName == 'item') {
      shapedData = shapeObject(data, transactionItemModel)
    }

    if (!shapedData) return false

    db.get(tableName)
      .find(id)
      .assign(shapedData)
      .write()

    return data
  } else {
    return false
  }
}

module.exports = editData