import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 5000
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})
export default request
// 请求拦截器：请求做些事情
// config是每一次请求的配置对象
request.interceptors.request.use(
  //   每一次发请求都会执行
  // 在发送请求之前做些什么
  // 登录了，所有的请求都加上Authorization
  function (config) {
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
