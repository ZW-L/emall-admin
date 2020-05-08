import request from '@/utils/request'

export const login = (data) => request({
  url: '',
  method: 'post',
  data
})

export const logout = () => request({
  url: '',
  method: 'post'
})

export const getInfo = (token) => request({
  url: '',
  method: 'get',
  params: { token }
})
