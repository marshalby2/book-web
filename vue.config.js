'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

/**
 * @type {{devServer: {port: number, host: string}, chainWebpack: chainWebpack}}
 */
module.exports = {
  // 使用这个别名无法编译通过
  // resolve: {
  //   alias: {
  //     '@': resolve('src')
  //   }
  // },
  // 使用这个别名无法跳转
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  devServer: {
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9500, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxy: {
      '/api': {
        target: 'http://localhost:9527', // 你要跨域的网址  比如  'http://news.baidu.com',
        // secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 这个参数是用来回避跨站问题的，配置完之后发请求时会自动修改http header里面的host，但是不会修改别的
        pathRewrite: {
          '^/api': '' // 路径的替换规则
        }
      }
    }
  }
}
