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
export function change_status (params) {
  return fetch({
    url: 'message/change_status',
    method: 'post',
    params
  })
}
// 删除消息
export function del_msg (params) {
  return fetch({
    url: 'message/delete',
    method: 'post',
    params
  })
}