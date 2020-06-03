import request from '@/utils/request'

export const getProducts = ({
  page,
  limit,
  category,
  reverse,
  dateRange,
  onsale,
  search
}) => request({
  url: '/mock/emall/product/list',
  method: 'get',
  params: { page, limit, onsale, search, reverse, category, dateRange }
})

export const getProductDetail = (id) => request({
  url: '/mock/emall/product/detail',
  method: 'get',
  params: { id }
})

export const addProduct = (product) => request({
  url: '/mock/emall/product/add',
  method: 'post',
  data: { product }
})

export const updateProduct = (product) => request({
  url: '/mock/emall/product/update',
  method: 'post',
  data: { product }
})

export const deleteProduct = (id) => request({
  url: '/mock/emall/product/delete',
  method: 'delete',
  data: { id }
})
