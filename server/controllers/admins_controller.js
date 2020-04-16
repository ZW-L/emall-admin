const mongoose = require('mongoose')
const Admins = mongoose.model('Admins')
const hashPwd = require('../util/hashPwd')
const res2json = require('../util/res2json')
const { filterSecret } = require('../util/filter')

exports.signup = function (req, res) {
  const admin = new Admins({
    username: req.body.username,
    pwd: hashPwd(req.body.password),
    email: req.body.email
  })
  admin.save((err, doc) => {
    if (err) {
      res.json(res2json(1, err.message))
    } else {
      res.json(res2json(0, 'Success'))
    }
  })
}

exports.login = function (req, res) {
  Admins.findOne({ username: req.body.username })
    .exec((err, user) => {
      if (!user) {
        res.json(res2json(1, 'User Not Found.'))
      } else if (user.pwd === hashPwd(req.body.password)) {
        res.json(0, 'Login Success.', filterSecret(user, ['pwd', 'permission']))
      } else {
        res.json(res2json(1, 'Authentication fail.'))
      }

      if (err) {
        res.json(res2json(1, err.message))
      }
    })
}

exports.logout = function (req, res) {

}
