import request from '@/utils/request'

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

/**
 * 退出
 */
export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

/**
 *  获取登录用户信息
 *
 * @returns {*}
 */
export function getUserInfo () {
  return request({
    url: '/user/getUserInfo',
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

/**
 *  分页查询
 *
 * @param params
 */
export function getByPage (params) {
  return request({
    url: '/user/page',
    method: 'get'
  })
}

/**
 *  获取详细信息
 *
 * @param id
 */
export function getDetail (id) {
  return request({
    url: '/user/detail/' + id,
    method: 'get'
  })
}

/**
 *  删除
 *
 * @param id
 */
export function remove (id) {
  return request({
    url: '/user/delete/' + id,
    method: 'delete'
  })
}
