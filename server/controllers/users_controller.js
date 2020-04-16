const mongoose = require('mongoose')
const Users = mongoose.model('Users')
const res2json = require('../util/res2json')
const hashPwd = require('../util/hashPwd')
const filterFields = require('../util/filter')

exports.login = function (req, res) {
  Users.findOne({ username: req.body.username })
    .exec((err, user) => {
      if (!user) {
        err = 'User Not Found.' // 用户不存在
      } else if (user.pwd === hashPwd(req.body.password)) { // 登录成功
        req.session.user = user._id
        req.session.username = user.username
        res.json(res2json(0, 'Authentication Success.'))
      } else {
        err = 'Authentication failed.' // 密码验证失败
      }

      if (err) {
        res.json(res2json(1, err))
      }
    })
}

exports.signup = function (req, res) {
  const user = new Users({
    username: req.body.username,
    pwd: hashPwd(req.body.password),
    email: req.body.email
  })
  user.save(err => {
    if (err) {
      res.json(1, err.message)
    } else {
      req.session.user = user._id
      req.session.username = user.username
      res.json(res2json(0, 'Signup Success.'))
    }
  })
}

exports.updateUser = function (req, res) {
  Users.findOne({ _id: req.body.user })
    .exec((err, user) => {
      if (err) {
        res.json(res2json(1, err.message))
      } else {
        filterFields(req.body).forEach(v => user.set(v[0], v[1])) // 循环添加字段
        user.save(err => {
          if (err) {
            res.json(res2json(1, err.message))
          } else {
            res.json(res2json(0, 'Update Success.'))
          }
        })
      }
    })
}

exports.deleteUser = function (req, res) {
  Users.findOne({ _id: req.body.user })
    .exec((err, user) => {
      if (err) {
        res.json(res2json(1, err.message))
      } else if (user) {
        user.remove(err => {
          if (err) {
            res.json(res2json(1, err.message))
          } else {
            res.json(res2json(0, 'Success.'))
            req.session.destroy()
          }
        })
      } else {
        res.json(res2json(1, 'User Not Found.'))
      }
    })
}

exports.getUser = function (req, res) {
  Users.findOne({ _id: req.query.id })
    .exec((err, user) => {
      if (err) {
        res.json(res2json(1, err.message))
      } else if (!user) {
        res.json(res2json(1, 'User Not Found.'))
      } else {
        const ret = {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar
        }
        res.json(res2json(1, 'Success.', ret))
      }
    })
}

exports.getUsers = function (req, res) {
  const start = req.query.start ? parseInt(req.query.start) : 0
  const limit = req.query.limit ? parseInt(req.query.limit) : 10
  console.log(start, limit)
  Users.find({}).skip(start).limit(limit)
    .exec((err, users) => {
      if (err) {
        res.json(res2json(1, err.message))
      } else if (!users) {
        res.json(res2json(1, 'No Results.'))
      } else {
        const ret = users.map(v => {
          const { _id, username, email, avatar } = v
          return {
            _id,
            username,
            email,
            avatar
          }
        })
        res.json(res2json(0, 'Success', ret))
      }
    })
}
