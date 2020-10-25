const jwt = require('jsonwebtoken')
const jwtConfig = require('../jwtConfig')

/**
 * create (sign) jwt token
 * @param {any} data data payload that want to be encoded as token
 * @returns {String} jwt token
 */
function signJwt(data) {
  const token = jwt.sign(data, jwtConfig.secret, jwtConfig.options)
  return token
}

/**
 * verify jwt token
 * @param {String} token jwt token
 * @returns {any} returns data payload
 */

const verifyJwt = (req, res, next) => {
  const authorization = req.headers.authorization
  const secretKey = jwtConfig.secret
  const token = authorization.split(' ')[1]
  if (!token) return res.status(400).json("Token is not found!")
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json("Token decode failure!")
    req.userData = decoded;
    next()
  })
}

const jwtFunctions = { signJwt, verifyJwt }
module.exports = jwtFunctions