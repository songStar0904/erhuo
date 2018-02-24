const routers = [{
    path: '/',
    name: 'home',
    meta: {
        title: ''
    },
    component: (resolve) => require(['../views/home/home.vue'], resolve)
}, {
      path: '*',
      redirect: '/'
}, {
    path: '/regist',
    name: 'regist',
    component: (resolve) => require(['../views/user/regist.vue'], resolve)
}, {
    path: '/login',
    name: 'login',
    component: (resolve) => require(['../views/user/login.vue'], resolve)
}, {
    path: '/forget',
    name: 'forget',
    component: (resolve) => require(['../views/user/forget.vue'], resolve)
}];
export default routers;