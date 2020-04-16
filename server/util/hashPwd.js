const crypto = require('crypto')

module.exports = function (pwd) {
  return crypto.createHash('sha256').update(pwd).digest('base64').toString()
}
