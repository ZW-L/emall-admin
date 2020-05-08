import Mock from 'mockjs'

const products = Mock.mock({
  'list|10-50': [{
    'index|+1': 1,
    name: '@string',
    date: '@datetime',
    'productId|9000000000-9999999999': 1,
    'category|1': ['手机', '电脑', '化妆品'],
    'tags|1': ['家用', '超薄', '智能', '补贴', '新品', '高性能'],
    onsale: '@boolean'
  }]
})

export default products
