import fetch from './fetch/index.js'
// 获取热搜
export function get_hot (params) {
  return fetch({
    url: 'goods/get_hot',
    method: 'get',
    params
  })
}
// 举报
export function report (data) {
  return fetch({
    url: 'report/add',
    method: 'post',
    data
  })
}