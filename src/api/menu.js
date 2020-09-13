import request from '@/utils/request'

/**
 *  加载菜单树
 *
 * @param lazy
 * @param parentId
 */
export function getMenuTree (lazy, parentId) {
  request({
    url: '/menu/tree',
    method: 'get',
    data: {
      lazy: lazy,
      parentId: parentId
    }
  })
}
