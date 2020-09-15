import request from '@/utils/request'

/**
 *  加载菜单树
 *
 * @param lazy 是否懒加载（false: 加载全部菜单 true:加载指定父ID下的子菜单）
 * @param parentId 菜单父ID
 */
export function getMenuTree (lazy, parentId) {
  return request({
    url: '/menu/tree',
    method: 'get',
    params: {
      lazy: lazy,
      parentId: parentId
    }
  })
}

/**
 *  查询菜单树
 *
 * @param userId
 */
export function getMenuTreeByUserId (userId) {
  return request({
    url: '/menu/tree/' + userId,
    method: 'get'
  })
}

/**
 *  分页查询
 *
 * @param params
 */
export function getByPage (params) {
  return request({
    url: '/menu/page',
    method: 'get',
    params: params
  })
}

/**
 *  获取详细信息
 *
 * @param id
 */
export function getDetail (id) {
  return request({
    url: '/menu/detail/' + id,
    method: 'get'
  })
}
