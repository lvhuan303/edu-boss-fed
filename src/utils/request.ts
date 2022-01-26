import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

const redirectLogin = () => {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

const doRefreshToken = () => {
  return axios.create()({
    method: 'post',
    url: '/front/user/refresh_token',
    data: qs.stringify({ refreshtoken: store.state.user.refresh_token })
  })
}

const request = axios.create({
  // 配置选项
  // baseURL,
  // timeout
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user && user.access_token) {
    // if (!config.headers) config.headers = {}
    (config.headers as any).Authorization = user.access_token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 刷新状态
let isRfreshing = false
let requests: any[] = []
// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, async function (error) { // 超出2xx的状态码
  if (error.response) { // 请求发出去收到响应了，但是状态码超出了 2xx 范围
    const { status } = error.response
    switch (status) {
      case 400:
        Message.error('请求参数错误')
        break
      case 401:
        if (!store.state.user) {
          redirectLogin()
          return Promise.reject(error)
        }
        if (!isRfreshing) {
          isRfreshing = true
          doRefreshToken().then(res => {
            if (!res.data.success) {
              throw new Error('刷新 Token 失败')
            }
            store.commit('setUser', res.data.content)
            console.log(requests)
            requests.forEach(cb => cb())
            requests = []
            // 从新调用接口
            return request(error.config)
          }).catch(err => {
            console.log(err)
            store.commit('setUser', null)
            redirectLogin()
            return Promise.reject(error)
          }).finally(() => {
            isRfreshing = false // 重置刷新状态
          })
        } else {
          // 挂起并发请求的数据
          return new Promise(resolve => {
            requests.push(() => {
              resolve(request(error.config))
            })
          })
        }
        break
      case 403:
        Message.error('没有权限，请联系管理员')
        break
      case 404:
        Message.error('请求资源不存在')
        break
      default:
        Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败：${error.message}`)
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
