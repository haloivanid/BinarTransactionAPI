const getData = require('../controllers/getController')

function collectTransactionItem(transactionId) {
    const listTransactionItem = getData('transactionItem', { transactionId })
    let totalPrice = 0
    let totalProduct = 0
    listTransactionItem.forEach((item) => {
        totalPrice = totalPrice + item.price
        totalProduct = totalProduct + item.quantity
    })
    return { totalPrice, totalProduct }
}

module.exports = collectTransactionItem