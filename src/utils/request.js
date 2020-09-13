import axios from 'axios'

/**
 *  create axios instance
 * @type {AxiosInstance}
 */
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

/**
 * request interceptor
 */
service.interceptors.request.use(
  config => {
    // TODO
    //  do something before request
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
  res => {
    // TODO
    //  do something for response data
    return res
  },
  error => {
    // error handle
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
