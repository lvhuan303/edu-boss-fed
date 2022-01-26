/**
 * 菜单相关接口
 */
import request from '@/utils/request'

/**
 * 创建更新菜单
 * @param data
 */
export const saveOrUpdateResource = (data : any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

/**
 * 获取所有菜单
 */
export const getAllCategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

/**
 * 获取资源信息
 */
export const getResource = (id:number) => {
  return request({
    method: 'GET',
    url: `/boss/resource/${id}`
  })
}

/**
 * 获取资源列表
 * @param data
 */
export const getResourcePages = (data:any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

/**
 * 删除资源
 * @param id
 */
export const delResource = (id:number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

/**
 * 创建分类
 * @param data
 */
export const saveCate = (data:any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}

/**
 * 删除分类
 * @param id
 */
export const delCate = (id:number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${id}`
  })
}
