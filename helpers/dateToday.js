function dateToday() {
    return new Date().toISOString().split('T')[0]
}

module.exports = dateToday