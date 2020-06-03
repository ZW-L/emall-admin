const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const app = express()

// add middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(session({
  secret: 'e_mall',
  cookie: { maxAge: 1000 * 60 * 60 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    db: mongoose.connection.db,
    connection: 'sessions'
  })
}))

// connect mongodb
mongoose.connect('mongodb://localhost:27017/emall', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// users module
require('./db/models/users_models')
require('./routes/users_routes')(app)

// admins module
require('./db/models/admins_models')
require('./routes/admins_routes')(app)

// products module
require('./db/models/products_model')
require('./routes/products_routes')(app)

// CROS middleware
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.get('/', (req, res) => {
  res.json({
    status: 0,
    msg: 'Hello Express!',
    result: []
  })
})

app.listen(8081)
console.log('Server is running at http://localhost:8081')
