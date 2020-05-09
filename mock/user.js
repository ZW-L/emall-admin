const Mock = require('mockjs')

const users = []
let count = 1000

for (let i = 0; i < count; i++) {
  users.push(Mock.mock({
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

const getUsers = query => {
  let ret
  const { page = 1, limit = 50, vip = '', search = '', reverse = false } = query

  if (!search) {
    ret = [].concat(users)
  } else {
    ret = users.filter(v => v.name.includes(search) || v.email.includes(search) || v.id.includes(search))
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
    url: '/emall/user/list',
    method: 'get',
    response: getUsers
  },

  {
    url: '/emall/user/detail',
    method: 'get',
    response: (query) => {
      const { id } = query
      for (const user of users) {
        if (user.id === id) {
          return {
            status: 200,
            data: user
          }
        }
      }
    }
  },

  {
    url: '/emall/user/add',
    method: 'post',
    response: (data) => {
      const user = Object.assign(data.user, {
        id: Mock.mock('@id'),
        register_date: new Date(),
        vip: '大众会员'
      })

      users.push(user)
      count += 1

      return {
        status: 200,
        message: 'Success'
      }
    }
  },

  {
    url: '/emall/user/update',
    method: 'post',
    response: (data) => {
      const { id } = data.user

      for (let i = 0; i < count; i++) {
        if (users[i].id === id) {
          users[i] = data.user
        }
      }

      return {
        status: 200,
        message: 'Success'
      }
    }
  },

  {
    url: '/emall/user/delete',
    method: 'delete',
    response: (data) => {
      const index = users.findIndex(v => v.id === data.id)

      if (index === -1) {
        return {
          status: 404,
          message: 'User Not Found'
        }
      }

      users.splice(index, 1)
      console.log('delete user: ', data.id)

      return {
        status: 200,
        message: 'Success'
      }
    }
  }
]
