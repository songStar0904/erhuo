const routers = [{
    path: '/',
    name: 'home',
    meta: {
        title: ''
    },
    component: (resolve) => require(['../views/home/home.vue'], resolve)
}, {
      path: '*',
      // redirect: '/'
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
    }, {
        path: '/user/sell',
        name: 'usell',
        component: (resolve) => require(['../views/user/sell.vue'], resolve),
    }, {
        path: '/user/fans',
        name: 'ufans',
        meta: {
            title: 'fans'
        },
        component: (resolve) => require(['../views/user/fans.vue'], resolve),
    }, {
        path: '/user/followers',
        name: 'ufollowers',
        meta: {
            title: 'followers'
        },
        component: (resolve) => require(['../views/user/fans.vue'], resolve),
    }]
}, {
    path: '/person/:uid',
    name: 'person',
    component: (resolve) => require(['../views/person/index.vue'], resolve),
    children: [{
        path: '/person/:uid/sell',
        name: 'sell',
        component: (resolve) => require(['../views/user/sell.vue'], resolve)
    }, {
        path: '/person/:uid/fans',
        name: 'fans',
        meta: {
            title: 'fans'
        },
        component: (resolve) => require(['../views/user/fans.vue'], resolve)
    }, {
        path: '/person/:uid/followers',
        meta: {
            title: 'followers'
        },
        name: 'followers',
        component: (resolve) => require(['../views/user/fans.vue'], resolve)
    }]
},  {
    path: '/publish',
    name: 'publish',
    component: (resolve) => require(['../views/publish/index.vue'], resolve)
}];
export default routers;