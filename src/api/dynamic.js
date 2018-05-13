import fetch from './fetch/index.js'
// 获取 动态
export function get (params) {
  return fetch({
    url: 'dynamic/get',
    method: 'get',
    params
  })
}
// 获取 单个动态
export function get_one (params) {
  return fetch({
    url: 'dynamic/get_one',
    method: 'get',
    params
  })
}
// 修改动态
export function edit (data) {
  return fetch({
    url: 'dynamic/edit',
    method: 'post',
    data
  })
}
// 添加动态
export function add (data) {
  return fetch({
    url: 'dynamic/add',
    method: 'post',
    data
  })
}
// 删除动态
export function del (data) {
  return fetch({
    url: 'dynamic/delete',
    method: 'post',
    data
  })
}
// 分享
export function share (data) {
  return fetch({
    url: 'dynamic/share',
    method: 'post',
    data
  })
}