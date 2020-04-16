const products = require('../controllers/products_controllers')

module.exports = function (app) {
  app.post('/product/add', products.add)
  app.post('./product/update', products.update)
  app.post('./product/delete', products.delete)

  // /product?id=5e932b1fb41b58cde5ffa54c
  app.get('/product', products.getProduct)

  // /product?start=0&limit=10
  app.get('/products', products.getProducts)
}
