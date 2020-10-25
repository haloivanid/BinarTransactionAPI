const { lowerFirst } = require("../connections/dbConnection");
const adminModel = require("../models/adminModel");
const customerModel = require("../models/customerModel")
const shapeObject = require("../helpers/shapeObjectHelper")
const db = require("../connections/dbConnection");
const shapeObject = require("../helpers/shapeObjectHelper");
const itemsModel = require("../models/itemsModel");
const discountModel = require("../models/discountModel");

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
    if (tableName == 'customer') {
      shapedData = shapeObject(data, customerModel)
    }
    if (tableName == 'admin') {
      shapedData = shapeObject(data, adminModel)
    }
    if (tableName == 'items') {
      shapedData = shapeObject(data, itemsModel)
    }
    if (tableName == 'discount') {
      shapedData = shapeObject(data, discountModel)
    }
    console.log(shapedData, "--shaped data")
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