import Mock from 'mockjs'

const products = Mock.mock({
  'list|10-50': [{
    name: '@string',
    date: '@date',
    'productId|9000000000-9999999999': 1
  }]
})

const users = Mock.mock({
  'list|200-500': [{
    'index|+1': 1,
    name: '@cname',
    register_date: '@date',
    email: '@email',
    'vip|1': ['大众会员', '高级会员', '超级会员']
  }]
})

const orders = Mock.mock({
  'list|10-50': [{
    date: '@date',
    productId: '@id',
    'status|1': ['待支付', '进行中', '已完成']
  }]
})

Mock.mock('/api/products', products)
Mock.mock('/api/users', users)
Mock.mock('/api/orders', orders)

export default Mock
