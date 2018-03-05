import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router/router';
import store from './store';
import util from './libs/util';
import App from './main.vue';
import './theme/index.less';
// 引入api
import api from './api'
Vue.use(api)

Vue.use(VueRouter);
Vue.use(iView);


// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    if (!store.state.user.islogin && to.path === '/user') {
      store.dispatch('is_login').then((res) => {
          let islogin = res
          if (!islogin && to.path === '/user') {
            next({ path: '/home' })
          } else {
            next()
      }
    })
    } else {
        next();
    }
    util.title(to.meta.title);
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});