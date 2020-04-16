const Admins = require('../controllers/admins_controller')

module.exports = function (app) {
  app.post('/admin/signup', Admins.signup)
  app.post('/admin/login', Admins.login)
  app.post('/admin/logout', Admins.logout)
}
