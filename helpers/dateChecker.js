function dateChecker(date) {
    const isRealDate = new Date(date)
    if (isRealDate.toString() !== 'Invalid Date')
        return true
    return false
}

module.exports = dateChecker