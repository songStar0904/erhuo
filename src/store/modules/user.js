import Cookies from 'js-cookie';
import api from '../../api';

const user = {
    state: {info: null, isLogin: 0},
    actions: {
      is_login ({ commit }) {
        return new Promise((resolve, reject) => {
          api.apiObj.user.isLogin()
              .then((res) => {
                if (res.code === 200) {
                  resolve(res.data);
                  commit('setIslogin', res.data);
                }
              });
        });
      }
    },
    mutations: {
        logout (state, vm) {
            localStorage.setItem('user_info', null);
            state.info = null;
            state.isLogin = 0;
        },
        setEditUser (state, data) {
            for (let key in data) {
                if (state.info[key]) {
                    state.info[key] = data[key];
                }
            }
            localStorage.setItem('user_info', JSON.stringify(state.info));
        },
        setUser (state, data){
            localStorage.setItem('user_info', JSON.stringify(data));
            state.info = data;
        },
        getUser (state) {
            state.info = JSON.parse(localStorage.user_info);
        },
        setIslogin (state, data) {
            state.isLogin = data;
            if (!data) {
                localStorage.setItem('user_info', null);
            }
        }
    },
    getters: {
    }
};

export default user;
