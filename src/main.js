import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router/router';
import store from './store';
import util from './libs/util';
import vfilter from './libs/filter.js';
import App from './main.vue';
import './theme/index.less';
// 引入api
import api from './api'
Vue.use(api)
// 无限滚动
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.use(util)
Vue.use(VueRouter);
Vue.use(iView);

// 全局filter
for (let key in vfilter) {
    Vue.filter(key, vfilter[key])
}

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    // el.remove() 这个在ie存在兼容性问题
    el.parentNode.removeChild(el)
  }
})

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    // util.title(to.meta.title);
    if (to.name === 'login') {
      store.commit('setBeforePath', from.path);
    }
    const curRouterObj = util.getRouterObjByName([...Routers], to.name);
    if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
        store.dispatch('is_login').then((res) => {
            let islogin = res
            if (!islogin) {
              store.commit('logout');
              iView.Message.error('此页面需先登录');
              next({ name: from.name });
              iView.LoadingBar.finish();
            } else {
              next()
            }
        })
    } else { // 没有配置权限的路由, 直接通过
        util.toDefaultPage([...Routers], to.name, router, next);
    }  
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