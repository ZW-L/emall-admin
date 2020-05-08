import request from '@/utils/request'

export const getUsers = () => request({
  url: '',
  method: 'get'
})

export const getUserDetail = (id) => request({
  url: '',
  method: 'get',
  params: { id }
})

export const addUser = (user) => request({
  url: '',
  method: 'post',
  params: { user }
})

export const updateUser = (user) => request({
  url: '',
  method: 'post',
  params: { user }
})

export const deleteUser = (id) => request({
  url: '',
  method: 'delete'
})
