const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    name: 'Admin',
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: ['admin']
  },
  'editor-token': {
    name: 'Editor',
    introduction: 'I am an editor.',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: ['editor']
  }
}

module.exports = [
  {
    url: '/emall/user/login',
    method: 'post',
    response: data => {
      const { username } = data
      const token = tokens[username]

      if (!token) {
        return {
          status: 403,
          message: '登录失效，请确认用户名和密码！'
        }
      }

      return {
        status: 200,
        data: token
      }
    }
  },

  {
    url: '/emall/user/logout',
    method: 'post',
    response: () => {
      return {
        status: 200,
        message: 'Success'
      }
    }
  },

  {
    url: '/emall/user/info',
    method: 'get',
    response: query => {
      const { token } = query
      const info = users[token]

      if (!info) {
        return {
          status: 403,
          message: '登录失败，没有相应的用户信息！'
        }
      }

      return {
        status: 200,
        data: info
      }
    }
  }
]
