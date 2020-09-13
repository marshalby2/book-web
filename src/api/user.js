import request from '../utils/request'

/**
 *  用户登录
 *
 * @param username
 * @param password
 * @returns {*}
 */
export function login (username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function logout () {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

/**
 *  获取登录用户信息
 *
 * @returns {*}
 */
export function getInfo () {
  return request({
    url: '/admin/info',
    method: 'get'
  })
}

/**
 *  添加用户
 *
 * @param data
 * @returns {*}
 */
export function save (data) {
  return request({
    url: '/usr/save',
    method: 'post',
    data: data
  })
}
