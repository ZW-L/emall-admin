const Mock = require('mockjs')

const customers = []
let count = 1000

for (let i = 0; i < count; i++) {
  customers.push(Mock.mock({
    id: String('@id'),
    name: '@cname',
    nickname: '@string',
    tel: '@id',
    register_date: '@datetime',
    last_login_date: '@datetime',
    email: '@email',
    'vip|1': ['大众会员', '高级会员', '超级会员'],
    'sex|1': ['male', 'female'],
    introduction: '@string'
  }))
}

const getCustomers = query => {
  let ret
  const { page = 1, limit = 50, vip = '', search = '', reverse = false } = query

  if (!search) {
    ret = [].concat(customers)
  } else {
    ret = customers.filter(v => v.name.includes(search) || v.email.includes(search) || v.id.includes(search))
  }

  if (vip !== '') {
    ret = ret.filter(v => v.vip === vip)
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
    url: '/emall/customer/list',
    method: 'get',
    response: getCustomers
  },

  {
    url: '/emall/customer/detail',
    method: 'get',
    response: (query) => {
      const { id } = query
      for (const c of customers) {
        if (c.id === id) {
          return {
            status: 200,
            data: c
          }
        }
      }
    }
  },

  {
    url: '/emall/customer/add',
    method: 'post',
    response: (data) => {
      const customer = Object.assign(data.customer, {
        id: Mock.mock('@id'),
        register_date: new Date(),
        vip: '大众会员'
      })

      customers.push(customer)
      count += 1

      return {
        status: 200,
        message: 'Success'
      }
    }
  },

  {
    url: '/emall/customer/update',
    method: 'post',
    response: (data) => {
      const { id } = data.customer

      for (let i = 0; i < count; i++) {
        if (customers[i].id === id) {
          customers[i] = data.customer
        }
      }

      return {
        status: 200,
        message: 'Success'
      }
    }
  },

  {
    url: '/emall/customer/delete',
    method: 'delete',
    response: (data) => {
      const index = customers.findIndex(v => v.id === data.id)

      if (index === -1) {
        return {
          status: 404,
          message: 'Customer Not Found'
        }
      }

      customers.splice(index, 1)
      count -= 1
      console.log('delete customer: ', data.id)

      return {
        status: 200,
        message: 'Success'
      }
    }
  }
]
