const { filterFields } = require('../util/filter')

const user = {
  name: 'Alice',
  age: 22,
  tel: 1234455,
  pwd: 'asdas',
  avatar: 'sa.png',
  email: 'example@qq.com'
}

console.log(filterFields(user, ['name']))
