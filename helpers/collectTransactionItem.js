const getData = require('../controllers/getController')

/**
 * ini akan mengumpulkan data dari db table transactionItem berdasarkan trabsactionId
 * @param {string} transactionId 
 */
function collectTransactionItem(transactionId) {
    // mendapatkan data dari db table transactionItem dengan acuan transactionId
    const listTransactionItem = getData('transactionItem', { transactionId })
    // mendefinisikan nilai totalPrice awal dengan nilai 0
    let totalPrice = 0
    // mendefinisikan nilai totalProduct awal dengan nilai 0
    let totalProduct = 0
    // melakukan loop untuk mengecek setiap transaksi item yang didapat dan menjumlah harga dan quantitasnya ke totalPrice dan totalProduct
    listTransactionItem.forEach((item) => {
        totalPrice = totalPrice + item.price
        totalProduct = totalProduct + item.quantity
    })
    // hasil dari perhitungan fungsi diberikan
    return { totalPrice, totalProduct }
}

module.exports = collectTransactionItem