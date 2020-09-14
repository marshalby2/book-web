import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken,
    name: '',
    avatar: '',
    roles: [],
    menus: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },
  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password).then(response => {
          const data = response.data
          const tokenStr = data.tokenHead + data.tokenContent
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          console.log('退出成功')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 获取用户信息
    GetUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
          } /* else {
            reject('getUserInfo : roles must be a non-null array !')
          } */
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.avatar)
          commit('SET_MENUS', data.menus)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
