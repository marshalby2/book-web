import request from '@/utils/request'

/**
 *  保存
 *
 * @param data
 * @returns {*}
 */
export function save (data) {
  return request({
    url: '/role/save',
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
    url: '/role/page',
    method: 'get'
  })
}

/**
 *  查询所有
 *
 * @param params
 */
export function getList (params) {
  return request({
    url: '/role/list',
    method: 'get'
  })
}

/**
 *  查询所有
 *
 * @param params
 */
export function getListByUser (userId) {
  return request({
    url: '/role/list/' + userId,
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
    url: '/role/detail/' + id,
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
    url: '/role/delete/' + id,
    method: 'delete'
  })
}

/**
 *  保持角色菜单关系
 *
 * @param data
 */
export function saveMenu (data) {
  return request({
    url: '/role/saveMenu/',
    method: 'post',
    data: data
  })
}
