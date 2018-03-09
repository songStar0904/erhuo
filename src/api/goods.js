import fetch from './fetch/index.js'
// 获取 商品
export function get (params) {
  return fetch({
    url: 'goods/get',
    method: 'get',
    params
  })
}
export function get_one (params) {
  return fetch({
    url: 'goods/get_one',
    method: 'get',
    params
  })
}
export function get_edit (params) {
  return fetch({
    url: 'goods/get_edit',
    method: 'get',
    params
  })
}
// 删除图片
export function del_img (data) {
  return fetch({
    url: 'goods/del_img',
    method: 'post',
    data
  })
}
// 修改商品
export function edit (data) {
  return fetch({
    url: 'goods/edit',
    method: 'post',
    data
  })
}
// 添加商品
export function add (data) {
  return fetch({
    url: 'goods/add',
    method: 'post',
    data
  })
}
// 删除商品
export function del (data) {
  return fetch({
    url: 'goods/delete',
    method: 'delete',
    data
  })
}

// 获得收藏
export function get_followers (params) {
  return fetch({
    url: 'goods/get_follower',
    method: 'get',
    params
  })
}
export function follow (data) {
  return fetch({
    url: 'goods/follow',
    method: 'post',
    data
  })
}