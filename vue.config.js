'use strict'

const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    proxy: {
      '/mock': {
        target: 'http://localhost:8081',
        pathRewrite: { '^/mock': '' }
      }
    }
  }
}
