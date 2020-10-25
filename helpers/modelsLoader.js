function modelsLoader(tableName) {
    const readDir = require('read-dir-deep');
    const path = require('path')
    const thisDir = path.resolve()
    const baseDir = path.parse(thisDir).dir
    const modelsPath = path.join(baseDir, 'models')
    const filePaths = readDir.readDirDeepSync(modelsPath)
    let models;
    filePaths.forEach((filePath) => {
        const fileName = path.parse(filePath).name
        if (tableName + 'Model' == fileName) {
            models = require(filePath)
        }
    })
    return models
}

module.exports = modelsLoader