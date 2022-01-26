/**
 * 菜单相关接口
 */
import request from '@/utils/request'

/**
 * 创建更新菜单
 * @param data
 */
export const saveOrUpdateMenu = (data:any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

/**
 * 获取菜单信息
 * @param id
 */
export const getMenuInfo = (id:any = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: { id }
  })
}

/**
 * 获取所有菜单
 */
export const getAllMenu = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

/**
 * 删除菜单
 */
export const delMenu = (id:number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
