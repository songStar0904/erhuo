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
    access: 1,
    component: (resolve) => require(['../views/user/index.vue'], resolve),
    children: [{
        path: '/user/fmsg',
        name: 'fmsg',
        access: 1,
        component: (resolve) => require(['../views/user/fmsg.vue'], resolve)
    }, {
        path: '/user/info',
        name: 'info',
        access: 1,
        component: (resolve) => require(['../views/user/info.vue'], resolve)
    }, {
        path: '/user/sell',
        name: 'usell',
        meta: {
            title: 'sell',
            type: 'sell'
        },
        access: 1,
        component: (resolve) => require(['../views/user/sell.vue'], resolve),
    }, {
        path: '/user/collection',
        name: 'ucollection',
        meta: {
            title: 'collection',
            type: 'collection'
        },
        access: 1,
        component: (resolve) => require(['../views/user/sell.vue'], resolve),
    }, {
        path: '/user/fans',
        name: 'ufans',
        access: 1,
        meta: {
            title: 'fans',
            type: 'fans'
        },
        component: (resolve) => require(['../views/user/fans.vue'], resolve),
    }, {
        path: '/user/followers',
        name: 'ufollowers',
        access: 1,
        meta: {
            title: 'followers',
            type: 'followers'
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
        meta: {
            title: 'sell',
            type: 'sell'
        },
        component: (resolve) => require(['../views/user/sell.vue'], resolve)
    }, {
        path: '/person/:uid/collection',
        name: 'collection',
        meta: {
            title: 'collection',
            type: 'collection'
        },
        component: (resolve) => require(['../views/user/sell.vue'], resolve),
    }, {
        path: '/person/:uid/fans',
        name: 'fans',
        meta: {
            title: 'fans',
            type: 'fans'
        },
        component: (resolve) => require(['../views/user/fans.vue'], resolve)
    }, {
        path: '/person/:uid/followers',
        meta: {
            title: 'followers',
            type: 'followers'
        },
        name: 'followers',
        component: (resolve) => require(['../views/user/fans.vue'], resolve)
    }]
}, {
    path: '/publish',
    name: 'publish',
    access: 1,
    component: (resolve) => require(['../views/publish/index.vue'], resolve)
}, {
    path: '/gedit/:gid',
    name: 'gedit',
    access: 1,
    component: (resolve) => require(['../views/publish/index.vue'], resolve)
}, {
    path: '/discover',
    name: 'discover',
    component: (resolve) => require(['../views/discover/index.vue'], resolve)
}, {
    path: '/goods/:gid',
    name: 'goods',
    component: (resolve) => require(['../views/goods/index.vue'], resolve)
}, {
    path: '/message',
    name: 'message',
    access: 1,
    component: (resolve) => require(['../views/message/index.vue'], resolve),
    children: [{
        path: '/message/msg',
        name: 'msg',
        access: 1,
        component: (resolve) => require(['../views/message/msg.vue'], resolve)
    }, {
        path: '/message/comment',
        name: 'comment',
        component: (resolve) => require(['../views/message/comment.vue'], resolve)
    }]
}];
export default routers;