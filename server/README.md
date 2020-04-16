## 常用库

+ `express`: 成熟的 `Node.js` 框架
+ `body-parser`: 一个解析 `POST` 请求体的中间件
+ `cookie-parser`: 解析/设置 `cookie`
+ `query-string`: 解析 `RestfulAPI` 的查询参数
+ `mongoose`: 操作 `mongodtb` 的简易库
+ `typescript`: `javascript` 超集


### express



### body-parser

+ 全局使用中间件
```js
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// 以下几种使用方式是可选的，根据需要使用的场景引入
app.use(bodyParser.json()) // 解析 application/json
app.use(bodyParser.urlencoded()) // 解析 application/x-www-form-urlencoded
app.use(bodyParser.text({ type: 'text/html' })) // 将 HTML 请求体作为字符串处理
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' })) // 解析自定义的二进制 Buffer
```

+ 对某个路由使用中间件
```js
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded()

app.post('/login', urlencodedParser, function (req, res){
  // ...
})

app.post('/api/users', jsonParser, function (req, res){
  // ...
})
```

### cookie-parser


### query-string


### mongoose


