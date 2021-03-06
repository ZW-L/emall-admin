const express = require('express')
const bodyParser = require('body-parser')

const customer = require('./customer')
const products = require('./product')
const user = require('./user')
// const orders = require('./order')
const mocks = [
  ...customer,
  ...products,
  ...user
]

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

for (const i of mocks) {
  // GET 请求
  if (i.method === 'get') {
    app.get(i.url, (req, res) => {
      console.log(req.query)
      setTimeout(() => {
        res.json(i.response(req.query))
      }, 500)
    })
  } else {
    app.use(i.url, (req, res) => {
      console.log('post request...')
      setTimeout(() => {
        res.json(i.response(req.body))
      }, 500)
    })
  }
}

app.listen(8081, () => {
  console.log('Mock server is running at http://localhost:8081')
})
