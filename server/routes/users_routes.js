module.exports = function (app) {
  const users = require('../controllers/users_controller')

  app.post('/login', users.login)
  app.post('/signup', users.signup)
  app.post('/user/delete', users.deleteUser)
  app.post('/user/update', users.updateUser)

  // as /user?id=5e92e051040c9dcaadaf3bc6
  app.get('/user', users.getUser)

  // default to /users?start=0&limit=10
  app.get('/users', users.getUsers)
}
