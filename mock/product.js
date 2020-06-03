const Mock = require('mockjs')
const { isInDateRange } = require('./util')

// 扩展 Mock
Mock.Random.extend({
  tags () {
    let list = ['家用', '超薄', '智能', '补贴', '新品', '高性能']
    const t1 = this.pick(list)
    list = list.filter(v => v !== t1)
    const t2 = this.pick(list)
    return [t1, t2]
  }
})

const products = []
let count = 1000

for (let i = 0; i < count; i++) {
  products.push(Mock.mock({
    'index|+1': 1,
    name: '@string',
    create_date: '@datetime',
    'id|9000000000-9999999999': 1,
    'category|1': ['手机', '电脑', '化妆品'],
    tags: '@tags()',
    onsale: '@boolean',
    thumbnail: '@image("60x100", "#4A7BF7", "#FFF", "Mock")'
  }))
}

const getProducts = config => {
  const {
    page = 1,
    limit = 50,
    category = 'all',
    reverse = false,
    dateRange = ['', ''],
    onsale = '',
    search = ''
  } = config
  let ret = [].concat(products)

  // 上架状态
  if (onsale !== '') {
    ret = ret.filter(v => v.onsale.toString() === 'true')
  }

  // 商品分类
  if (category !== 'all') {
    ret = ret.filter(v => v.category === category)
  }

  // 日期区间
  if (dateRange[0] !== '') {
    ret = ret.filter(v => isInDateRange(v.create_date, dateRange))
  }

  // 关键字
  if (search) {
    ret = ret.filter(v => v.name.includes(search) || v.id.toString().includes(search))
  }

  // 逆序
  if (reverse) {
    ret = ret.reverse()
  }

  // 处理条目
  const allResult = ret.length
  ret = ret.slice((parseInt(page) - 1) * limit, limit * parseInt(page))

  return {
    status: 200,
    data: {
      all_result: allResult,
      total: ret.length,
      items: ret
    }
  }
}

module.exports = [
  {
    url: '/emall/product/list',
    method: 'get',
    response: getProducts
  },

  {
    url: '/emall/product/detail',
    method: 'get',
    response: (config) => {
      const { id } = config.query
      for (const p of products) {
        if (p.id === +id) {
          return {
            status: 200,
            data: p
          }
        }
      }
    }
  },

  {
    url: '/emall/product/add',
    method: 'post',
    response: (data) => {
      const { product } = data
      console.log(product.thumbnail)
      const thumbnail = product.thumbnail || Mock.mock('@image("60x100", "#4A7BF7", "#FFF", "Mock")')
      const prod = Object.assign(data.product, {
        id: Mock.mock('@id'),
        create_date: Mock.mock('@datetime'),
        thumbnail
      })

      products.push(prod)
      count += 1

      return {
        status: 200,
        message: 'Success'
      }
    }
  },

  {
    url: '/emall/product/update',
    method: 'post',
    response: (data) => {
      const { id } = data.product
      for (let i = 0; i < count; i++) {
        if (products[i].id === id) {
          products[i] = data.product
        }
      }

      return {
        status: 200,
        message: 'Success'
      }
    }
  },

  {
    url: '/emall/product/delete',
    method: 'delete',
    response: (data) => {
      const index = products.findIndex(v => v.id === data.id)

      if (index === -1) {
        return {
          status: 404,
          message: 'User Not Found'
        }
      }

      products.splice(index, 1)
      count -= 1
      console.log('delete user: ', data.id)

      return {
        status: 200,
        message: 'Success'
      }
    }
  }
]
