const Mock = require('mockjs')

const orders = Mock.mock({
  'list|10-50': [{
    date: '@datetime',
    productId: '@id',
    'status|1': ['待支付', '进行中', '已完成']
  }]
})

module.exports = orders
