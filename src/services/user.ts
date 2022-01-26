/**
 * 用户相关接口
 */
import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string,
  password: string
}

export const login = (data:User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

export const getUserInfo = () => {
  // return request({
  //   method: 'GET',
  //   url: '/front/user/getInfo'
  // })
  return request.get('/front/user/getInfo')
}

export const loginOut = () => {
  return request({
    method: 'POST',
    url: '/front/user/logout'
  })
}
