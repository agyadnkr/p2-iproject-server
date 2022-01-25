const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY;

const createToken = payload =>  jwt.sign(payload, secretKey)

const signToken = token => jwt.verify(token, secretKey)

module.exports = {
  createToken,
  signToken
}