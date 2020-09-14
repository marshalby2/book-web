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

export function getMenuTreeByUserId (userId) {
  return request({
    url: '/menu/tree/' + userId,
    method: 'get'
  })
}
