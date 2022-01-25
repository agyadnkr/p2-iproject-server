const bcrypt = require('bcryptjs')
const { password } = require('pg/lib/defaults')

const hashPassword = password => bcrypt.hashSync(password, 8)

const comparePassword  = (password, hash) => bcrypt.compareSync(password, hash)

module.exports = {
  hashPassword,
  comparePassword
}