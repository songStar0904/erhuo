import fetch from './fetch/index.js'
// 回复
export function send (data) {
  return fetch({
    url: 'message/send',
    method: 'post',
    data
  })
}

export function get (params) {
  return fetch({
    url: 'message/get',
    method: 'get',
    params
  })
}
export function get_by_id (params) {
  return fetch({
    url: 'message/get_by_id',
    method: 'get',
    params
  })
}
// 修改状态
export function change_status (data) {
  return fetch({
    url: 'message/change_status',
    method: 'post',
    data
  })
}
// 删除消息
export function del_msg (data) {
  return fetch({
    url: 'message/delete',
    method: 'post',
    data
  })
}
export function get_notice (params) {
  return fetch({
    url: 'message/get_notice',
    method: 'get',
    params
  })
}
// 点赞取消赞
export function praise (data) {
  return fetch({
    url: 'message/praise',
    method: 'post',
    data
  })
}