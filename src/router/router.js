const routers = [{
    path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['../views/main.vue'], resolve)
}];
export default routers;