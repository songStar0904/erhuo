
import fetch from './fetch/index.js'
// 登录
export function login (params) {
  return fetch({
    url: 'user/login',
    method: 'get',
    params
  })
}
// islogin
export function islogin (params) {
  return fetch({
    url: 'user',
    method: 'get',
    params
  })
}
// 登出
export function loginOut (params) {
  return fetch({
    url: 'user/login_out',
    method: 'get',
    params
  })
}
// 获得验证码
export function getCode (params) {
  return fetch({
    url: 'code/get_code',
    method: 'get',
    params
  })
}
// 注册
export function regist (data) {
  return fetch({
    url: 'user/register',
    method: 'post',
    data
  })
}
// 修改密码
export function change_psd (data) {
  return fetch({
    url: 'user/change_psd',
    method: 'post',
    data
  })
}
// 找回密码

export function find_psd (data) {
  return fetch({
    url: 'user/find_psd',
    method: 'post',
    data
  })
}
// 反馈意见
export function send_fmsg (data) {
  return fetch({
    url: 'user/send_fmsg',
    method: 'post',
    data
  })
}
// 获得粉丝和关注
export function get_followers (params) {
  return fetch({
    url: 'user/get_follower',
    method: 'get',
    params
  })
}
export function follow (data) {
  return fetch({
    url: 'user/follow',
    method: 'post',
    data
  })
}
// upload
export function upload (data) {
  return fetch({
    url: 'user/upload',
    method: 'post',
    data
  })
}
// checkPhone
export function checkPhone (params) {
  return fetch({
    url: 'user/phonecheck',
    method: 'get',
    params
  })
}
// get user
export function get_one (params) {
  return fetch({
    url: 'user/get_one',
    method: 'get',
    params
  })
}
export function edit (data) {
  return fetch({
    url: 'user/edit',
    method: 'post',
    data
  })
}
// getMsg
export function getMsg (params) {
  return fetch({
    url: '',
    method: 'get',
    params
  })
}
