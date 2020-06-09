import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/mock/emall/user/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/mock/emall/user/logout',
    method: 'post'
  })
}

export function getUserInfo (token) {
  return request({
    url: '/mock/emall/user/info',
    method: 'get',
    params: { token }
  })
}
