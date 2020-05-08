import Mock from 'mockjs'

// 分模块管理 Mock 数据
import users from './user'
import products from './product'
import orders from './order'

Mock.mock('/api/products', products)
Mock.mock('/api/users', users)
Mock.mock('/api/orders', orders)

export default Mock
