import axios from 'axios'
import { Message } from 'element-ui'

import store from '../store'
import { getToken } from '@/utils/auth'

/**
 *  create axios instance
 * @type {AxiosInstance}
 */
const service = axios.create({
  // url = base url + request url
  baseURL: '/api',
  // request timeouts
  timeout: 5000
})

/**
 * request interceptor
 */
service.interceptors.request.use(
  config => {
    // TODO
    if (store.getters.token) {
      config.headers['my-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // error handle
    console.log(error)
    return Promise.reject(error)
  }
)

/**
 * response interceptor
 */
service.interceptors.response.use(
  response => {
    /**
     * 错误处理
     */
    const res = response.data
    if (res.code !== 200) {
      console.log('response code not 200 : ' + res.message)// for debug
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(res.message))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
