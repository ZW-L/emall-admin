import Mock from 'mockjs'
import { param2Obj } from '@/utils/format'

// 分模块管理 Mock 数据
import users from './user'
import products from './product'
import orders from './order'

// Mock.mock('/api/users', users)
export function mockXHR () {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap (respond) {
    return function (options) {
      let result = null
      console.log(options)
      if (respond instanceof Function) {
        const { body, type, url } = options
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of users) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

Mock.mock('/api/products', products)
Mock.mock('/api/orders', orders)

export default Mock
