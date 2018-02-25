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
}, {
    path: '/user',
    name: 'user',
    component: (resolve) => require(['../views/user/index.vue'], resolve),
    children: [{
        path: '/user/fmsg',
        name: 'fmsg',
        component: (resolve) => require(['../views/user/fmsg.vue'], resolve)
    }, {
        path: '/user/info',
        name: 'info',
        component: (resolve) => require(['../views/user/info.vue'], resolve)
    }]
}];
export default routers;