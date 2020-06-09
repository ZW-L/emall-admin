import request from '@/utils/request'

export function getCustomers ({ page, limit, vip, search, reverse }) {
  return request({
    url: '/mock/emall/customer/list',
    method: 'get',
    params: { page, limit, vip, search, reverse }
  })
}

export function getCustomerDetail (id) {
  return request({
    url: '/mock/emall/customer/detail',
    method: 'get',
    params: { id }
  })
}

export function addCustomer (customer) {
  return request({
    url: '/mock/emall/customer/add',
    method: 'post',
    data: { customer }
  })
}

export function updateCustomer (customer) {
  return request({
    url: '/mock/emall/customer/update',
    method: 'post',
    data: { customer }
  })
}

export function deleteCustomer (id) {
  return request({
    url: '/mock/emall/customer/delete',
    method: 'delete',
    data: { id }
  })
}
