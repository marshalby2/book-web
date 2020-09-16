import { getMenuTree } from '@/api/menu'

const app = {
  state: {
    menuTree: []
  },
  mutations: {
    SET_MENU_TREE (state, menuTree) {
      state.menuTree = menuTree
    }
  },
  actions: {
    /**
     *  加载菜单树
     *
     * @param commit
     * @param params
     * @returns {Promise<unknown>}
     * @constructor
     */
    GetMenuTree ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getMenuTree(params.lazy, params.parentId).then(response => {
          const data = menuTreeOptimization(response.data)
          commit('SET_MENU_TREE', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

/**
 *  处理菜单树数据,解决当菜单树的子节点为空,即"children:[]"时,
 *  <el-cascader>选择器选择叶子节点,右侧弹出空白页,并显示'暂无数据'
 *
 * @param data
 * @returns {*}
 */
function menuTreeOptimization (data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].children.length < 1) {
      data[i].children = undefined
    } else {
      menuTreeOptimization(data[i].children)
    }
  }
  return data
}

export default app
