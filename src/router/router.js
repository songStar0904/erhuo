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
    component: (resolve) => require(['../views/regist/regist.vue'], resolve)
}];
export default routers;