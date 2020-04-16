const mongoose = require('mongoose')
const Product = mongoose.model('Product')

const { filterFields } = require('../util/filter')
const res2json = require('../util/res2json')

exports.add = function (req, res) {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    desc: req.body.desc,
    price: req.body.price,
    instock: req.body.instock
  })

  product.save(err => {
    if (err) {
      res.json(res2json(1, err.message))
    } else {
      res.json(res2json(0, 'Add Success'))
    }
  })
}

exports.update = function (req, res) {
  Product.findOne({ _id: req.body.id })
    .exec((err, product) => {
      if (err) {
        res.json(res2json(1, err.message))
      }

      if (product) {
        filterFields(req.body).forEach(v => product.set(v[0], v[1]))
        res.json(res2json(0, 'Update Success.', product))
      } else {
        res.json(res2json(1, 'Product Not Found.'))
      }
    })
}

exports.delete = function (req, res) {
  Product.findOne({ _id: req.body.id })
    .exec((err, product) => {
      if (err) {
        res.json(res2json(1, err.message))
      } else if (!product) {
        res.json(res2json(1, 'Product Not Found.'))
      } else {
        product.remove(err => {
          if (err) {
            res.json(res2json(1, err.message))
          } else {
            res.json(res2json(0, 'Delete Item Success.'))
          }
        })
      }
    })
}

exports.getProduct = function (req, res) {
  Product.findOne({ _id: req.query.id })
    .exec((err, product) => {
      if (err) {
        res.json(res2json(1, err.message))
      } else if (!product) {
        res.json(res2json(1, 'Product Not Found.'))
      } else {
        res.json(res2json(0, '', product))
      }
    })
}

exports.getProducts = function (req, res) {
  Product.find().exec((err, products) => {
    if (err) {
      res.json(res2json(1, err.message))
    } else if (!products) {
      res.json(res2json(1, 'No Results'))
    } else {
      res.json(res2json(0, '', products))
    }
  })
}
