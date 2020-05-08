import Mock from 'mockjs'

const users = Mock.mock({
  'list|200-500': [{
    'index|+1': 1,
    name: '@cname',
    nickname: '@string',
    tel: '@id',
    register_date: '@datetime',
    last_login_date: '@datetime',
    email: '@email',
    'vip|1': ['大众会员', '高级会员', '超级会员']
  }]
})

export const getData = [
  {
    url: '/emall/user/list',
    method: 'get',
    response: config => {}
  },

  {
    url: '/emall/user/detail',
    method: 'get',
    response: (config) => {
      const { id } = config.query
      for (const user of users) {
        if (user.id === +id) {
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
    response: () => {
      return {
        status: 200,
        message: 'Success'
      }
    }
  },

  {
    url: '/emall/user/update',
    method: 'post',
    response: () => {
      return {
        status: 200,
        message: 'Success'
      }
    }
  },

  {
    url: '/emall/user/delete',
    method: 'delete',
    response: () => {
      return {
        status: 200,
        message: 'Success'
      }
    }
  }
]

export default users
