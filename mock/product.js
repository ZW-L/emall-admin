const Mock = require('mockjs')

const products = []
const count = 1000

for (let i = 0; i < count; i++) {
  products.push(Mock.mock({
    'index|+1': 1,
    name: '@string',
    date: '@datetime',
    'id|9000000000-9999999999': 1,
    'category|1': ['手机', '电脑', '化妆品'],
    'tags|1': ['家用', '超薄', '智能', '补贴', '新品', '高性能'],
    onsale: '@boolean'
  }))
}

const getProducts = config => {
  let ret
  const { page = 1, limit = 50, onsale = 'all', search = '', reverse = false } = config

  if (!search) {
    ret = [].concat(products)
  } else {
    ret = products.filter(v => v.name.find(search) || v.id.toString().find(search))
  }

  if (onsale !== 'all') {
    ret = products.filter(v => v.onsale.toString() === onsale)
  }

  if (reverse) {
    ret = ret.reverse()
  }

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
    response: () => {
      return {
        status: 200,
        message: 'Success'
      }
    }
  },

  {
    url: '/emall/product/update',
    method: 'post',
    response: () => {
      return {
        status: 200,
        message: 'Success'
      }
    }
  },

  {
    url: '/emall/product/delete',
    method: 'delete',
    response: () => {
      return {
        status: 200,
        message: 'Success'
      }
    }
  }
]
