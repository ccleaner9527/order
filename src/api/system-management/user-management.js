import request from '@/helpers/request'
import sha1 from 'crypto-js/sha1'
const base = process.env.NODE_ENV === 'demo' ? window.demo.getWay : window.g.getWay
/**
 * 分页查询用户列表
 * @param {Object} params
 * @returns {Promise}
 */
export const getUsers = params => {
  return request.get(base + '/users', { params })
}

/**
 * 创建用户
 * @param {Object} params
 * @returns {Promise}
 */
export const addUsers = ({ password, ...params }) => {
  const data = Object.assign(params, { password: sha1(password).toString() })
  return request.post(base + `/users`, data)
}

/**
 * 查询用户
 * @param {String} id 用户ID
 * @returns {Promise}
 */
export const getUser = id => {
  return request.get(base + `/users/${id}`)
}

/**
 * 更新用户
 * @param {String} id 用户ID
 * @param {Object} params
 * @returns {Promise}
 */
export const editUsers = (id, params) => {
  return request.put(base + `/users/${id}`, params)
}

/**
 * 重置用户密码
 * @param {String} id 用户ID
 * @param {String} password
 * @returns {Promise}
 */
export const restUsersPassword = (id, password) => {
  const data = sha1(password).toString()
  return request.put(base + `/users/${id}/rest`, data, {
    headers: { 'Content-Type': 'text/plain' }
  })
}

/**
 * 更新用户状态
 * @param {String} id 用户ID
 * @param {String} status 状态(1:启用 2:禁用)
 * @returns {Promise}
 */
export const editUsersStatus = (id, status) => {
  return request.patch(base + `/users/${id}/${status === 1 ? 'enable' : 'disable'}`)
}

/**
 * 删除用户
 * @param {String} id 用户ID
 * @returns {Promise}
 */
export const deleteUser = id => {
  return request.delete(base + `/users/${id}`)
}
