import request from '@/utils/request'

export const getUsers = ({ page, limit, vip, search, reverse }) => request({
  url: '/mock/emall/user/list',
  method: 'get',
  params: { page, limit, vip, search, reverse }
})

export const getUserDetail = (id) => request({
  url: '/mock/emall/user/detail',
  method: 'get',
  params: { id }
})

export const addUser = (user) => request({
  url: '/mock/emall/user/add',
  method: 'post',
  data: { user }
})

export const updateUser = (user) => request({
  url: '/mock/emall/user/update',
  method: 'post',
  data: { user }
})

export const deleteUser = (id) => request({
  url: '/mock/emall/user/delete',
  method: 'delete',
  data: { id }
})
