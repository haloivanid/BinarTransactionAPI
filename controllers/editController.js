const { lowerFirst } = require("../connections/dbConnection");
const db = require("../connections/dbConnection");
const modelsLoader = require("../helpers/modelsLoader");
const shapeObject = require("../helpers/shapeObjectHelper")

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
    data.id = id
    const shapedData = shapeObject(data, modelsLoader(tableName))
    if (!shapedData) return false
    let editedData = db.get(tableName)
      .find({ id })
      .assign(shapedData)
      .write()

    return editedData

  } else {
    return false
  }
}

module.exports = editData