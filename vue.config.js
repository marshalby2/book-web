'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

/**
 *  如果创建config文件夹，在里面写一个index.js文件，把配置文件都写在里面的话，端口号配置不会生效，
 *  可是如果把配置信息写在这里，则跨域配置不会生效，发一次任意的GET/POST请求，会附带一个OPTIONS请求
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
    port: 9500 // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  }
}
