import request from '@/utils/request'

/**
 *  加载菜单树
 *
 * @param lazy 是否懒加载（false: 加载全部菜单 true:加载指定父ID下的子菜单）
 * @param parentId 菜单父ID
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
