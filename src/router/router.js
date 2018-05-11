const routers = [{
    path: '/',
    name: 'home',
    meta: {
        title: '二货 - 首页'
    },
    component: (resolve) => require(['../views/home/home.vue'], resolve)
}, {
      path: '*',
      redirect: '/'
}, {
    path: '/regist',
    name: 'regist',
    title: '二货 - 注册',
    component: (resolve) => require(['../views/user/regist.vue'], resolve)
}, {
    path: '/login',
    name: 'login',
    title: '二货 - 登录',
    component: (resolve) => require(['../views/user/login.vue'], resolve)
}, {
    path: '/forget',
    name: 'forget',
    component: (resolve) => require(['../views/user/forget.vue'], resolve)
}, {
    path: '/user/info',
    name: 'user',
    access: 1,
    meta: {
        title: '用户中心'
    },
    component: (resolve) => require(['../views/user/index.vue'], resolve),
    children: [{
        path: '/user/fmsg',
        name: 'fmsg',
        access: 1,
        meta: {
            title: '意见反馈'
        },
        component: (resolve) => require(['../views/user/fmsg.vue'], resolve)
    }, {
        path: '/user/info',
        name: 'info',
        access: 1,
        meta: {
            title: '个人设置'
        },
        component: (resolve) => require(['../views/user/info.vue'], resolve)
    }, {
        path: '/user/sell',
        name: 'usell',
        meta: {
            title: '发布的二货',
            type: 'usell',
            showMeau: true
        },
        access: 1,
        component: (resolve) => require(['../views/user/sell.vue'], resolve),
    }, {
        path: '/user/collection',
        name: 'ucollection',
        meta: {
            title: '收藏的二货',
            type: 'collection',
            showMeau: false
        },
        access: 1,
        component: (resolve) => require(['../views/user/sell.vue'], resolve),
    }, {
        path: '/user/fans',
        name: 'ufans',
        access: 1,
        meta: {
            title: '我的粉丝',
            type: 'fans'
        },
        component: (resolve) => require(['../views/user/fans.vue'], resolve),
    }, {
        path: '/user/followers',
        name: 'ufollowers',
        access: 1,
        meta: {
            title: '我的关注',
            type: 'followers'
        },
        component: (resolve) => require(['../views/user/fans.vue'], resolve),
    }, {
        path: '/user/dynamic',
        name: 'udynamic',
        meta: {
            title: '我的动态',
            showMeau: true
        },
        access: 1,
        component: (resolve) => require(['../views/user/dynamic.vue'], resolve),
    }]
}, {
    path: '/person/:uid/sell',
    name: 'person',
    meta: {
        title: '用户中心'
    },
    component: (resolve) => require(['../views/person/index.vue'], resolve),
    children: [{
        path: '/person/:uid/sell',
        name: 'sell',
        meta: {
            title: '发布的二货',
            type: 'sell',
            showMeau: false
        },
        component: (resolve) => require(['../views/user/sell.vue'], resolve)
    }, {
        path: '/person/:uid/collection',
        name: 'collection',
        meta: {
            title: '收藏的二货',
            type: 'collection',
            showMeau: false
        },
        component: (resolve) => require(['../views/user/sell.vue'], resolve),
    }, {
        path: '/person/:uid/fans',
        name: 'fans',
        meta: {
            title: 'TA 的粉丝',
            type: 'fans'
        },
        component: (resolve) => require(['../views/user/fans.vue'], resolve)
    }, {
        path: '/person/:uid/followers',
        meta: {
            title: 'TA 的关注',
            type: 'followers'
        },
        name: 'followers',
        component: (resolve) => require(['../views/user/fans.vue'], resolve)
    }, {
        path: '/person/:uid/dynamic',
        name: 'pdynamic',
        meta: {
            title: 'TA 的动态',
            showMeau: false
        },
        component: (resolve) => require(['../views/user/dynamic.vue'], resolve),
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
    path: '/message/comment',
    name: 'message',
    access: 1,
    meta: {
        title: '我的消息'
    },
    component: (resolve) => require(['../views/message/index.vue'], resolve),
    children: [{
        path: '/message/notice',
        name: 'notice',
        access: 1,
        meta: {
            title: '公告通知'
        },
        component: (resolve) => require(['../views/message/notice.vue'], resolve)
    }, {
        path: '/message/l_comment',
        name: 'l_comment',
        access: 1,
        meta: {
            title: '二货评论',
            type: 'goods'
        },
        component: (resolve) => require(['../views/message/comment.vue'], resolve)
    },  {
        path: '/message/d_comment',
        name: 'd_comment',
        access: 1,
        meta: {
            title: '动态评论',
            type: 'dynamic'
        },
        component: (resolve) => require(['../views/message/comment.vue'], resolve)
    }, {
        path: '/message/letter',
        name: 'letter',
        access: 1,
        meta: {
            title: '私信'
        },
        component: (resolve) => require(['../views/error-page/404.vue'], resolve)
    }]
}, {
    path: '/dynamic',
    name: 'dynamic',
    meta: {
        title: '动态'
    },
    component: (resolve) => require(['../views/dynamic/index.vue'], resolve)
}, ];
export default routers;