import fetch from './fetch/index.js'
// 回复
export function send (data) {
  return fetch({
    url: 'message/send',
    method: 'post',
    data
  })
}
