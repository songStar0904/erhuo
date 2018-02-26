import Cookies from 'js-cookie';

const user = {
    state: {info: null},
    mutations: {
        logout (state, vm) {
            Cookies.remove('user');
            Cookies.remove('access');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        },
        setUser (state, data){
            localStorage.setItem('user_info', JSON.stringify(data));
            state.info = data;
        },
        getUser (state) {
            state.info = JSON.parse(localStorage.user_info);
        }
    },
    getters: {
        isLogin (state) {
            return state.info ? true : false;
        }
    }
};

export default user;
